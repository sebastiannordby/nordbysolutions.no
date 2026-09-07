using Microsoft.EntityFrameworkCore;
using Norso.API.Features.BusinessFeature.Models;

namespace Norso.API.Features
{
    public class VrimleContext : DbContext
    {
        public VrimleContext(DbContextOptions options) : base(options)
        {
        }

        protected VrimleContext()
        {
        }

        public DbSet<BusinessProfile> BusinessProfiles { get; set; }
    }
}
