namespace Norso.API.Tests.Integration
{
    [CollectionDefinition(CollectionName)]
    public class WebApplicationFactoryCollection : ICollectionFixture<WebApplicationFactoryFixture>
    {
        public const string CollectionName = nameof(WebApplicationFactoryCollection);
    }
}
