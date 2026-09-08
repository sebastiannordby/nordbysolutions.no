using Microsoft.EntityFrameworkCore;
using Norso.API.Features.BusinessFeature.Models;

namespace Norso.API.Features.BusinessFeature.UseCases.BrregImport
{
    public class BrregBusinessProfileImport(
        VrimleContext context,
        IBreegOrganizationalUnitProvider breegOrganizationalUnitProvider,
        ILogger<BrregBusinessProfileImport> logger)
    {
        private const int BatchSize = 1000;

        public async Task ExecuteImportAsync(CancellationToken cancellationToken = default)
        {
            var industrialCodes = IndustrialCodesToImport.Select(x => x.Code).ToHashSet();
            var importedCount = 0;
            var updatedCount = 0;
            var processedCount = 0;

            logger.LogDebug("Starting import of business profiles from Brreg with {Count} industrial codes.", industrialCodes.Count);

            var existingBusinessProfiles = await context.BusinessProfiles
                .Where(x => x.OrganizationNumber != null)
                .ToDictionaryAsync(x => x.OrganizationNumber!, x => x, cancellationToken);

            await foreach (var unit in await breegOrganizationalUnitProvider.GetAsync(cancellationToken))
            {
                processedCount++;

                if (
                    (unit.naeringskode1 is not null && industrialCodes.Contains(unit.naeringskode1.kode))
                    || (unit.naeringskode2 is not null && industrialCodes.Contains(unit.naeringskode2.kode))
                    || (unit.naeringskode3 is not null && industrialCodes.Contains(unit.naeringskode3.kode)))
                {
                    if (existingBusinessProfiles.TryGetValue(unit.organisasjonsnummer, out var existingProfile))
                    {
                        updatedCount++;

                        var description = string.Join(" ", unit.aktivitet ?? []);
                        if (description.Length > 1000)
                            description = description.Substring(0, 999);

                        existingProfile.Description = description;
                        context.BusinessProfiles.Update(existingProfile);
                    }
                    else
                    {
                        var businessProfile = new BusinessProfile
                        {
                            OrganizationNumber = unit.organisasjonsnummer,
                            Name = unit.navn,
                            EmailAddress = unit.epostadresse,
                            PhoneNumber = unit.telefon,
                            AddressLine = unit.forretningsadresse?.adresse?.FirstOrDefault(),
                            PostalCode = unit.forretningsadresse?.postnummer,
                            PostalPlace = unit.forretningsadresse?.poststed,
                            Country = unit.forretningsadresse?.land,
                        };
                        context.BusinessProfiles.Add(businessProfile);
                        importedCount++;
                    }


                    if (importedCount % BatchSize == 0)
                    {
                        await context.SaveChangesAsync(cancellationToken);
                        context.ChangeTracker.Clear();
                        logger.LogInformation("Imported {ImportedCount} profiles after processing {ProcessedCount} units.", importedCount, processedCount);
                    }
                }
            }

            await context.SaveChangesAsync(cancellationToken);
            context.ChangeTracker.Clear();
            logger.LogInformation("Finished importing business profiles from Brreg. Imported {ImportedCount} from {ProcessedCount} processed units.", importedCount, processedCount);
        }


        public List<IndustrialCode> IndustrialCodesToImport = new List<IndustrialCode>()
        {
            // Food & beverages
            new() { Code = "56.110", Description = "Restaurantvirksomhet" },
            new() { Code = "56.120", Description = "Gatekjøkken- og takeawayvirksomhet" },
            new() { Code = "56.210", Description = "Cateringvirksomhet" },
            new() { Code = "56.300", Description = "Drift av barer" },
            new() { Code = "10.710", Description = "Produksjon av brød og ferske konditorvarer" },
            new() { Code = "10.720", Description = "Produksjon av kavringer, kjeks og konserverte konditorvarer" },
            new() { Code = "10.390", Description = "Bearbeiding og konservering av frukt og grønnsaker ellers" },
            new() { Code = "10.890", Description = "Produksjon av næringsmidler ellers" },
            new() { Code = "11.050", Description = "Produksjon av øl" },
            new() { Code = "11.070", Description = "Produksjon av mineralvann og annet flaskevann" },

            // Agriculture / farms / local producers
            new() { Code = "01.130", Description = "Dyrking av grønnsaker, meloner, rot- og knollvekster" },
            new() { Code = "01.240", Description = "Dyrking av kjernefrukter og steinfrukter" },
            new() { Code = "01.250", Description = "Dyrking av annen frukt og bær" },
            new() { Code = "01.280", Description = "Dyrking av krydder- og aromatiske vekster" },
            new() { Code = "01.490", Description = "Husdyrhold ellers" },
            new() { Code = "01.630", Description = "Etterbehandling av jordbruksproduksjon" },
            new() { Code = "01.640", Description = "Behandling av såvarer" },

            // Retail / specialty shops
            new() { Code = "47.110", Description = "Butikkhandel med bredt vareutvalg med hovedvekt på nærings- og nytelsesmidler" },
            new() { Code = "47.210", Description = "Butikkhandel med frukt og grønnsaker" },
            new() { Code = "47.220", Description = "Butikkhandel med kjøtt og kjøttvarer" },
            new() { Code = "47.230", Description = "Butikkhandel med fisk, skalldyr og bløtdyr" },
            new() { Code = "47.240", Description = "Butikkhandel med bakeri- og konditorvarer" },
            new() { Code = "47.250", Description = "Butikkhandel med drikkevarer" },
            new() { Code = "47.290", Description = "Butikkhandel med nærings- og nytelsesmidler ellers" },
            new() { Code = "47.510", Description = "Butikkhandel med tekstiler" },
            new() { Code = "47.610", Description = "Butikkhandel med bøker" },
            new() { Code = "47.761", Description = "Butikkhandel med blomster og planter" },
            new() { Code = "47.791", Description = "Butikkhandel med antikviteter" },
            new() { Code = "47.792", Description = "Butikkhandel med brukte varer" },

            // Arts & culture
            new() { Code = "90.010", Description = "Utøvende kunstnere og underholdningsvirksomhet innen musikk" },
            new() { Code = "90.020", Description = "Tjenester tilknyttet underholdningsvirksomhet" },
            new() { Code = "90.030", Description = "Selvstendig kunstnerisk virksomhet" },
            new() { Code = "91.020", Description = "Drift av museer" },

            // Sports & activities
            new() { Code = "93.110", Description = "Drift av idrettsanlegg" },
            new() { Code = "93.120", Description = "Drift av idrettslag og klubber" },
            new() { Code = "93.130", Description = "Treningssentre" },
            new() { Code = "93.210", Description = "Drift av fornøyelses- og temaparker" },
            new() { Code = "93.290", Description = "Andre fritidsaktiviteter" },

            // Tourism / experiences
            new() { Code = "55.100", Description = "Hotellvirksomhet" },
            new() { Code = "55.201", Description = "Drift av vandrerhjem" },
            new() { Code = "55.202", Description = "Drift av ferieleiligheter" },
            new() { Code = "55.300", Description = "Drift av campingplasser" },
            new() { Code = "55.900", Description = "Annen overnatting" },
            new() { Code = "79.110", Description = "Reisebyråvirksomhet" },
            new() { Code = "79.120", Description = "Reisearrangørvirksomhet" },
        };
    }

    public record IndustrialCode
    {
        public required string Code { get; set; }
        public required string Description { get; set; }
    }
}
