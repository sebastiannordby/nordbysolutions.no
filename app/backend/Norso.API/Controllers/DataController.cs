using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Norso.API.Features;
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

    [HttpPost("MigrateToPostgres")]
    public IActionResult MigrateToPostgres()
    {
        _ = Task.Run(async () =>
        {
            using var scope = serviceScopeFactory.CreateScope();
            var oldContext = scope.ServiceProvider.GetRequiredService<MssqlVrimleContext>();
            var newContext = scope.ServiceProvider.GetRequiredService<VrimleContext>();

            var businessProfiles = await oldContext.BusinessProfiles.ToArrayAsync();

            logger.LogInformation("Migrating number of business profiles: {Number}", businessProfiles.Length);
            newContext.BusinessProfiles.AddRange(businessProfiles);
            await newContext.SaveChangesAsync();
            logger.LogInformation("Business profiles now available inside postgres.");
        });

        return Accepted();
    }

}