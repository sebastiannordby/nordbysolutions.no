using Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates;

namespace Norso.API.Infrastructure.Clients
{
    public class GeoNorgeAddressSearchClient(HttpClient client) : IAddressSearchClient
    {
        public async Task<AddressSearchResponse> SearchAsync(
            AddressSearchParams @params,
            CancellationToken cancellationToken)
        {
            var queryParams = new Dictionary<string, string?>
            {
                ["fuzzy"] = "false",
                ["adressetekst"] = @params.AdresseTekst,
                ["poststed"] = @params.PostSted,
                ["postnummer"] = @params.PostNummer,
                ["utkoordsys"] = "4258",
                ["treffPerSide"] = "10",
                ["side"] = "0",
                ["asciiKompatibel"] = "true",
            };

            var queryString = string.Join("&", queryParams
                .Where(x => !string.IsNullOrWhiteSpace(x.Value))
                .Select(x => $"{Uri.EscapeDataString(x.Key)}={Uri.EscapeDataString(x.Value!)}"));

            using var response = await client.GetAsync($"/adresser/v1/sok?{queryString}", cancellationToken);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<AddressSearchResponse>(cancellationToken);

            return result ?? new AddressSearchResponse();
        }
    }
}
