using Bogus;
using Microsoft.EntityFrameworkCore;
using Norso.API.Features;
using Norso.API.Features.BusinessFeature.Models;
using Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates;
using NSubstitute;

namespace Norso.API.Tests.Integration.Features.BusinessFeature
{
    [Collection(WebApplicationFactoryCollection.CollectionName)]
    public class AddressCoorinateImportTests(WebApplicationFactoryFixture fixture)
    {
        private readonly Faker _faker = new();

        [Fact]
        public async Task Updates_business_with_coordinates_based_on_address()
        {
            // Given
            using var scope = fixture.Factory.Services.CreateScope();
            var sut = scope.ServiceProvider.GetRequiredService<ImportBusinessProfileCoordinates>();
            var validationContext = scope.ServiceProvider.GetRequiredService<VrimleContext>();

            var expectedSearchPoint = new AddressSearchPoint
            {
                Lat = 59.911491,
                Lon = 10.757933
            };

            fixture.AddressSearchClientMock
                .SearchAsync(default, default)
                .ReturnsForAnyArgs(new AddressSearchResponse()
                {
                    Adresser = new List<AddressSearchAddress>
                    {
                        new AddressSearchAddress
                        {
                            Representasjonspunkt = expectedSearchPoint
                        }
                    }
                });

            var business = new BusinessProfile
            {
                OrganizationNumber = _faker.Random.AlphaNumeric(10),
                PostalCode = _faker.Address.ZipCode(),
                PostalPlace = _faker.Address.City(),
                AddressLine = _faker.Address.StreetAddress(),
                Name = _faker.Company.CompanyName(),
            };
            validationContext.Add(business);
            await validationContext.SaveChangesAsync(TestContext.Current.CancellationToken);

            // When
            await sut.ExecuteAsync(TestContext.Current.CancellationToken);

            // Then
            var businessProfiles = await validationContext.BusinessProfiles
                .AsNoTracking()
                .Where(x => x.OrganizationNumber == business.OrganizationNumber)
                .FirstAsync(TestContext.Current.CancellationToken);
            Assert.NotNull(businessProfiles.Latitude);
            Assert.Equal(expectedSearchPoint.Lat, businessProfiles.Latitude.Value);
            Assert.NotNull(businessProfiles.Longitude);
            Assert.Equal(expectedSearchPoint.Lon, businessProfiles.Longitude.Value);
        }
    }
}
