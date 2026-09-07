using Norso.API.Features.BusinessFeature.UseCases.BrregImport;
using Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates;
using Norso.API.Infrastructure.Clients;
using Norso.API.Infrastructure.Providers;

namespace Norso.API.Infrastructure
{
    public static class InfrastructureExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IBreegOrganizationalUnitProvider, BrregOrganizationalUnitFileProvider>();
            services.AddHttpClient<IAddressSearchClient, GeoNorgeAddressSearchClient>(client =>
            {
                client.BaseAddress = new Uri("https://ws.geonorge.no");
                client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
            });

            return services;
        }
    }
}
