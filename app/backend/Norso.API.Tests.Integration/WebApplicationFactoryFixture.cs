using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Norso.API.Features;
using Norso.API.Features.BusinessFeature.UseCases.BrregImport;
using Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates;
using NSubstitute;
using Testcontainers.PostgreSql;

namespace Norso.API.Tests.Integration
{
    public class WebApplicationFactoryFixture : IAsyncLifetime
    {
        private WebApplicationFactory<Program> _factory;
        public WebApplicationFactory<Program> Factory => _factory;

        private readonly PostgreSqlContainer _testDatabaseContainer = new PostgreSqlBuilder("postgres:15.19-trixie").Build();

        public IBreegOrganizationalUnitProvider BreegOrganizationalUnitProviderMock = Substitute.For<IBreegOrganizationalUnitProvider>();
        public IAddressSearchClient AddressSearchClientMock = Substitute.For<IAddressSearchClient>();

        public async ValueTask DisposeAsync()
        {
            await _testDatabaseContainer.StopAsync();
            await _factory.DisposeAsync();
        }

        public async ValueTask InitializeAsync()
        {
            await _testDatabaseContainer.StartAsync();

            var testDatabaseConnectionString = _testDatabaseContainer.GetConnectionString();
            var context = new VrimleContext(new DbContextOptionsBuilder<VrimleContext>()
                .UseNpgsql(testDatabaseConnectionString)
                .Options);
            await context.Database.EnsureCreatedAsync();

            var configs = new[]
            {
                 new KeyValuePair<string, string?>("Secrets:DbConnectionString", testDatabaseConnectionString)
            };

            _factory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureAppConfiguration(configBuilder =>
                    {
                        configBuilder.AddInMemoryCollection(configs);
                    });

                    builder.ConfigureServices(x =>
                    {
                        x.RemoveAll<IBreegOrganizationalUnitProvider>();
                        x.AddSingleton(BreegOrganizationalUnitProviderMock);

                        x.RemoveAll<IAddressSearchClient>();
                        x.AddSingleton(AddressSearchClientMock);
                    });
                });
        }
    }
}
