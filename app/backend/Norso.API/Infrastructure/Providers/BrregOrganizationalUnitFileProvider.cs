using Norso.API.Features.BusinessFeature.UseCases.BrregImport;
using System.Text.Json;

namespace Norso.API.Infrastructure.Providers
{
    public class BrregOrganizationalUnitFileProvider(
        IConfiguration configuration,
        ILogger<BrregOrganizationalUnitFileProvider> logger) : IBreegOrganizationalUnitProvider
    {
        private static readonly JsonSerializerOptions _jsonSerializerOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            DefaultBufferSize = 1024 * 64,
        };

        private readonly string _filePath =
            configuration["Brreg:OrganizationalUnitFilePath"]
            ?? throw new InvalidOperationException("Missing configuration for Brreg organizational unit file path.");

        public Task<IAsyncEnumerable<BrregOrganizationUnitContract>> GetAsync(CancellationToken cancellationToken)
        {
            if (!File.Exists(_filePath))
            {
                throw new FileNotFoundException("Brreg organizational unit file was not found.", _filePath);
            }

            return Task.FromResult(ReadAsync(cancellationToken));
        }

        private async IAsyncEnumerable<BrregOrganizationUnitContract> ReadAsync(CancellationToken cancellationToken)
        {
            await using var stream = new FileStream(
                _filePath,
                FileMode.Open,
                FileAccess.Read,
                FileShare.Read,
                bufferSize: 1024 * 64,
                options: FileOptions.Asynchronous | FileOptions.SequentialScan);

            var units = JsonSerializer.DeserializeAsyncEnumerable<JsonElement>(
                stream,
                _jsonSerializerOptions,
                cancellationToken);

            await foreach (var unit in units)
            {
                BrregOrganizationUnitContract? contract = null;

                try
                {
                    contract = unit.Deserialize<BrregOrganizationUnitContract>(_jsonSerializerOptions);
                }
                catch (JsonException ex)
                {
                    logger.LogWarning(ex, "Skipping invalid Brreg organizational unit JSON object.");
                }

                if (contract is not null)
                {
                    yield return contract;
                }
            }
        }
    }
}
