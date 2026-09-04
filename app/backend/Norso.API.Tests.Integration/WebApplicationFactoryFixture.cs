using Microsoft.AspNetCore.Mvc.Testing;

namespace Norso.API.Tests.Integration
{
    public class WebApplicationFactoryFixture : IAsyncLifetime
    {
        private WebApplicationFactory<Program> _factory;
        public WebApplicationFactory<Program> Factory => _factory;


        public ValueTask DisposeAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask InitializeAsync()
        {
            var configs = new[] { };

            _factory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureAppConfiguration(configBuilder =>
                    {
                        configBuilder.AddInMemoryCollection(configs);
                    });

                    builder.ConfigureServices(x =>
                    {

                    });
                });

            _factory.StartServer();

            return ValueTask.CompletedTask;
        }
    }
}
