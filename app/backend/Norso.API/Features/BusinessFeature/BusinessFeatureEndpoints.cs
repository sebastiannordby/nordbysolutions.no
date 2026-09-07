using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Norso.API.Features.BusinessFeature
{
    public class BusinessFeatureEndpoints
    {
        private const double EarthRadiusInKilometers = 6371.0088;

        public static async Task<Ok<BusinessProfileDto[]>> GetBusinessesCloseTo(
            [FromQuery] double latitude,
            [FromQuery] double longitude,
            [FromQuery] int radiusInKilometers,
            [FromServices] VrimleContext context,
            CancellationToken cancellationToken)
        {
            if (latitude is < -90 or > 90 || longitude is < -180 or > 180 || radiusInKilometers < 0)
            {
                return TypedResults.Ok(Array.Empty<BusinessProfileDto>());
            }

            var latitudeDelta = radiusInKilometers / EarthRadiusInKilometers * 180 / Math.PI;
            var longitudeDelta = Math.Abs(Math.Cos(ToRadians(latitude))) < double.Epsilon
                ? 180
                : radiusInKilometers / (EarthRadiusInKilometers * Math.Cos(ToRadians(latitude))) * 180 / Math.PI;

            var minLatitude = latitude - latitudeDelta;
            var maxLatitude = latitude + latitudeDelta;
            var minLongitude = longitude - longitudeDelta;
            var maxLongitude = longitude + longitudeDelta;

            var candidates = await context.BusinessProfiles
                .AsNoTracking()
                .Where(x =>
                    x.Latitude.HasValue &&
                    x.Longitude.HasValue &&
                    x.Latitude >= minLatitude &&
                    x.Latitude <= maxLatitude &&
                    x.Longitude >= minLongitude &&
                    x.Longitude <= maxLongitude)
                .Select(x => new
                {
                    x.Name,
                    x.OrganizationNumber,
                    x.AddressLine,
                    x.PostalCode,
                    x.PostalPlace,
                    Longitude = x.Longitude!.Value,
                    Latitude = x.Latitude!.Value,
                    x.PhoneNumber,
                    x.EmailAddress
                })
                .ToListAsync(cancellationToken);

            var result = candidates
                .Where(x => CalculateDistanceInKilometers(latitude, longitude, x.Latitude, x.Longitude) <= radiusInKilometers)
                .Select(x => new BusinessProfileDto(
                    x.Name,
                    x.OrganizationNumber ?? string.Empty,
                    x.AddressLine ?? string.Empty,
                    x.PostalCode ?? string.Empty,
                    x.PostalPlace ?? string.Empty,
                    x.Longitude,
                    x.Latitude,
                    x.PhoneNumber,
                    x.EmailAddress))
                .ToArray();

            return TypedResults.Ok(result);
        }

        private static double CalculateDistanceInKilometers(double latitude1, double longitude1, double latitude2, double longitude2)
        {
            var latitudeDistance = ToRadians(latitude2 - latitude1);
            var longitudeDistance = ToRadians(longitude2 - longitude1);

            var a = Math.Sin(latitudeDistance / 2) * Math.Sin(latitudeDistance / 2)
                + Math.Cos(ToRadians(latitude1)) * Math.Cos(ToRadians(latitude2))
                * Math.Sin(longitudeDistance / 2) * Math.Sin(longitudeDistance / 2);

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            return EarthRadiusInKilometers * c;
        }

        private static double ToRadians(double degrees)
        {
            return degrees * Math.PI / 180;
        }
    }

    public record BusinessProfileDto(
        string Name,
        string OrganizationNumber,
        string Address,
        string PostalCode,
        string City,
        double Longitude,
        double Latitude,
        string? PhoneNumber,
        string? EmailAddress);
}
