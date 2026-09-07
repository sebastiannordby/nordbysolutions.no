using Norso.API.Features.BusinessFeature.UseCases.BrregImport;
using Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates;

namespace Norso.API.Features.BusinessFeature
{
    public static class BusinessFeatureExtensions
    {
        public static IServiceCollection AddBusinessFeature(this IServiceCollection services)
        {
            services.AddTransient<BrregBusinessProfileImport>();
            services.AddTransient<ImportBusinessProfileCoordinates>();
            return services;
        }

        public static void MapBusinessFeatureEndpoints(this RouteGroupBuilder routeBuilder)
        {
            var group = routeBuilder.MapGroup("/business");

            group.MapGet("/close-to", BusinessFeatureEndpoints.GetBusinessesCloseTo);

        }
    }
}
