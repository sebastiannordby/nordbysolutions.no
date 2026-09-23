using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Norso.API.Features;
using Norso.API.Features.BusinessFeature.Models;
using Norso.API.Features.BusinessFeature.UseCases.BrregImport;
using Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates;

namespace Norso.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DataController(
    IHostApplicationLifetime hostApplicationLifetime,
    IServiceScopeFactory serviceScopeFactory,
    ILogger<DataController> logger) : ControllerBase
{
    [HttpPost("StartBrregImport")]
    public IActionResult StartBrregImport()
    {
        _ = Task.Run(async () =>
        {
            try
            {
                using var scope = serviceScopeFactory.CreateScope();
                var importer = scope.ServiceProvider.GetRequiredService<BrregBusinessProfileImport>();
                await importer.ExecuteImportAsync(hostApplicationLifetime.ApplicationStopping);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Brreg import failed.");
            }
        }, hostApplicationLifetime.ApplicationStopping);

        return Accepted();
    }

    [HttpPost("StartImportCoordinates")]
    public IActionResult StartImportCoordinates()
    {
        _ = Task.Run(async () =>
        {
            try
            {
                using var scope = serviceScopeFactory.CreateScope();
                var importer = scope.ServiceProvider.GetRequiredService<ImportBusinessProfileCoordinates>();
                await importer.ExecuteAsync(hostApplicationLifetime.ApplicationStopping);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Import coordinates failed.");
            }
        }, hostApplicationLifetime.ApplicationStopping);
        return Accepted();
    }

    [HttpPost("MigrateToPostgres")]
    public IActionResult MigrateToPostgres()
    {
        _ = Task.Run(async () =>
        {
            logger.LogInformation("Starting migration of business profiles from MSSQL to Postgres.");

            using var scope = serviceScopeFactory.CreateScope();
            var oldContext = scope.ServiceProvider.GetRequiredService<MssqlVrimleContext>();
            var newContext = scope.ServiceProvider.GetRequiredService<VrimleContext>();
            var businessProfiles = await oldContext.BusinessProfiles.AsNoTracking().ToArrayAsync();

            foreach (var chunk in businessProfiles.Chunk(500))
            {
                logger.LogInformation("Migrating number of business profiles: {Number}", chunk.Length);
                newContext.BusinessProfiles.AddRange(chunk.Select(MapBusinessProfile));
                await newContext.SaveChangesAsync();
                newContext.ChangeTracker.Clear();
            }

            logger.LogInformation("Business profiles now available inside postgres.");
        });

        return Accepted();
    }

    private static BusinessProfile MapBusinessProfile(MssqlBusinessProfile businessProfile)
    {
        return new BusinessProfile
        {
            Id = businessProfile.Id,
            OrganizationNumber = businessProfile.OrganizationNumber,
            Name = businessProfile.Name,
            AddressLine = businessProfile.AddressLine,
            PostalCode = businessProfile.PostalCode,
            PhoneNumber = businessProfile.PhoneNumber,
            EmailAddress = businessProfile.EmailAddress,
            Country = businessProfile.Country,
            PostalPlace = businessProfile.PostalPlace,
            Longitude = businessProfile.Longitude,
            Latitude = businessProfile.Latitude,
            Description = businessProfile.Description
        };
    }

}