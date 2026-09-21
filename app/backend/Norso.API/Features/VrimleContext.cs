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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessProfile>(entity =>
            {

                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);
                entity.Property(e => e.OrganizationNumber)
                    .HasMaxLength(30);
                entity.Property(e => e.Description)
                    .HasMaxLength(1000);
                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20);
                entity.Property(e => e.EmailAddress)
                    .HasMaxLength(100);
                entity.Property(e => e.Country)
                    .HasMaxLength(50);
                entity.Property(e => e.PostalPlace)
                    .HasMaxLength(50);
                entity.Property(e => e.PostalCode)
                    .HasMaxLength(10);
                entity.Property(e => e.AddressLine)
                    .HasMaxLength(150);
                entity.Property(e => e.Latitude)
                    .HasPrecision(8, 5);
                entity.Property(e => e.Longitude)
                    .HasPrecision(9, 5);
            });
        }
    }
}
