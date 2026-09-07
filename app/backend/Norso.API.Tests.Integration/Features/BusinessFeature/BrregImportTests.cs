using Microsoft.EntityFrameworkCore;
using Norso.API.Features;
using Norso.API.Features.BusinessFeature.UseCases.BrregImport;
using NSubstitute;

namespace Norso.API.Tests.Integration.Features.BusinessFeature
{
    [Collection(WebApplicationFactoryCollection.CollectionName)]
    public class BrregImportTests(WebApplicationFactoryFixture fixture)
    {
        [Theory]
        [InlineData("56.110")]
        [InlineData("56.120")]
        public async Task Imports_business_profiles(string industrialCode)
        {
            // Given
            using var scope = fixture.Factory.Services.CreateScope();
            var sut = scope.ServiceProvider.GetRequiredService<BrregBusinessProfileImport>();
            var validationContext = scope.ServiceProvider.GetRequiredService<VrimleContext>();

            var units = new BrregOrganizationUnitContract[]
            {
                new()
                {
                    organisasjonsnummer = "123456789",
                    navn = "Test Company AS",
                    registreringsdatoEnhetsregisteret = "2020-01-01",
                    registrertIMvaregisteret = true,
                    antallAnsatte = 10,
                    harRegistrertAntallAnsatte = true,
                    naeringskode1 = new()
                    {
                        kode = industrialCode
                    }
                }
            };

            fixture.BreegOrganizationalUnitProviderMock
                .GetAsync(default)
                .ReturnsForAnyArgs(Task.FromResult(units.ToAsyncEnumerable()));

            // When
            await sut.ExecuteImportAsync(TestContext.Current.CancellationToken);

            // Then
            var businessProfiles = await validationContext.BusinessProfiles
                .AsNoTracking()
                .ToArrayAsync(TestContext.Current.CancellationToken);
            Assert.NotEmpty(businessProfiles);
        }
    }
}
