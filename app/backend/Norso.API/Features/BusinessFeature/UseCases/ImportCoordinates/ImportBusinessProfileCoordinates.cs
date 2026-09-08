using Microsoft.EntityFrameworkCore;

namespace Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates;

public class ImportBusinessProfileCoordinates(
    VrimleContext context,
    IAddressSearchClient addressSearchClient,
    ILogger<ImportBusinessProfileCoordinates> logger)
{
    public async Task ExecuteAsync(CancellationToken cancellationToken = default)
    {
        var businessesWithoutCoordinated = await context.BusinessProfiles
            .Where(b => b.Latitude == null || b.Longitude == null)
            .Where(x => !string.IsNullOrWhiteSpace(x.AddressLine))
            .Where(x => !x.AddressLine!.StartsWith("c/o"))
            .ToArrayAsync(cancellationToken);

        foreach (var business in businessesWithoutCoordinated)
        {
            try
            {
                var coordinates = await addressSearchClient.SearchAsync(new()
                {
                    AdresseTekst = business.AddressLine,
                    PostNummer = business.PostalCode,
                    PostSted = business.PostalPlace,
                }, cancellationToken);

                if (coordinates?.Adresser?.FirstOrDefault()?.Representasjonspunkt is { } point)
                {
                    business.Latitude = point.Lat;
                    business.Longitude = point.Lon;
                    context.BusinessProfiles.Update(business);
                    await context.SaveChangesAsync(cancellationToken);
                    logger.LogInformation("Updated coordinates for business {OrganizationNumber}: ({Lat}, {Lon})", business.OrganizationNumber, point.Lat, point.Lon);
                }

                //await Task.Delay(50, cancellationToken); // Delay to avoid hitting rate limits
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error updating coordinates for business {OrganizationNumber}", business.OrganizationNumber);
            }
        }
    }
}
