namespace Norso.API.Features
{
    public class MssqlBusinessProfile
    {
        public Guid Id { get; set; }
        public string? OrganizationNumber { get; set; }
        public string Name { get; set; } = null!;
        public string? AddressLine { get; set; }
        public string? PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? EmailAddress { get; set; }
        public string? Country { get; set; }
        public string? PostalPlace { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string? Description { get; set; }
    }
}
