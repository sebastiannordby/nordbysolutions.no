using System.Text.Json.Serialization;

namespace Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates
{
    public interface IAddressSearchClient
    {
        Task<AddressSearchResponse> SearchAsync(AddressSearchParams @params, CancellationToken cancellationToken);
    }

    public record AddressSearchParams
    {
        public string? AdresseTekst { get; init; }
        public string? PostNummer { get; init; }
        public string? PostSted { get; init; }
    }

    public record AddressSearchResponse
    {
        [JsonPropertyName("metadata")]
        public AddressSearchMetadata? Metadata { get; init; }

        [JsonPropertyName("adresser")]
        public List<AddressSearchAddress> Adresser { get; init; } = [];
    }

    public record AddressSearchMetadata
    {
        [JsonPropertyName("treffPerSide")]
        public int? TreffPerSide { get; init; }

        [JsonPropertyName("side")]
        public int? Side { get; init; }

        [JsonPropertyName("totaltAntallTreff")]
        public int? TotaltAntallTreff { get; init; }

        [JsonPropertyName("viserFra")]
        public int? ViserFra { get; init; }

        [JsonPropertyName("viserTil")]
        public int? ViserTil { get; init; }

        [JsonPropertyName("sokeStreng")]
        public string? SokeStreng { get; init; }

        [JsonPropertyName("asciiKompatibel")]
        public bool? AsciiKompatibel { get; init; }
    }

    public record AddressSearchAddress
    {
        [JsonPropertyName("adressetekst")]
        public string? AdresseTekst { get; init; }

        [JsonPropertyName("poststed")]
        public string? Poststed { get; init; }

        [JsonPropertyName("postnummer")]
        public string? Postnummer { get; init; }

        [JsonPropertyName("kommunenummer")]
        public string? Kommunenummer { get; init; }

        [JsonPropertyName("kommunenavn")]
        public string? Kommunenavn { get; init; }

        [JsonPropertyName("representasjonspunkt")]
        public AddressSearchPoint? Representasjonspunkt { get; init; }
    }

    public record AddressSearchPoint
    {
        [JsonPropertyName("epsg")]
        public string? Epsg { get; init; }

        [JsonPropertyName("lat")]
        public double? Lat { get; init; }

        [JsonPropertyName("lon")]
        public double? Lon { get; init; }
    }
}
