namespace Norso.API.Features.BusinessFeature.UseCases.BrregImport
{
    public interface IBreegOrganizationalUnitProvider
    {
        Task<IAsyncEnumerable<BrregOrganizationUnitContract>> GetAsync(CancellationToken cancellationToken);
    }
}
