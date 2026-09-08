namespace Norso.API.Features.BusinessFeature.Models
{
    public class BusinessProfile
    {
        public Guid Id { get; set; }
        public string? OrganizationNumber { get; set; }
        public required string Name { get; set; }
        public string? AddressLine { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? EmailAddress { get; set; }
        public string? Country { get; internal set; }
        public string? PostalPlace { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string? Description { get; internal set; }
    }
}
