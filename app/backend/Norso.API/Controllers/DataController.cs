using Microsoft.AspNetCore.Mvc;
using Norso.API.Features.BusinessFeature.UseCases.BrregImport;
using Norso.API.Features.BusinessFeature.UseCases.ImportCoordinates;

namespace Norso.API.Controllers;

[ApiController]
[Route("[controller]")]
public class DataController(
    IHostApplicationLifetime hostApplicationLifetime,
    IServiceScopeFactory serviceScopeFactory,
    ILogger<DataController> logger) : ControllerBase
{
    [HttpPost("StartBrregImport")]
    public IActionResult StartBrregImport()
    {
        _ = Task.Run(async () =>
        {
            try
            {
                using var scope = serviceScopeFactory.CreateScope();
                var importer = scope.ServiceProvider.GetRequiredService<BrregBusinessProfileImport>();
                await importer.ExecuteImportAsync(hostApplicationLifetime.ApplicationStopping);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Brreg import failed.");
            }
        }, hostApplicationLifetime.ApplicationStopping);

        return Accepted();
    }

    [HttpPost("StartImportCoordinates")]
    public IActionResult StartImportCoordinates()
    {
        _ = Task.Run(async () =>
        {
            try
            {
                using var scope = serviceScopeFactory.CreateScope();
                var importer = scope.ServiceProvider.GetRequiredService<ImportBusinessProfileCoordinates>();
                await importer.ExecuteAsync(hostApplicationLifetime.ApplicationStopping);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Import coordinates failed.");
            }
        }, hostApplicationLifetime.ApplicationStopping);
        return Accepted();
    }
}