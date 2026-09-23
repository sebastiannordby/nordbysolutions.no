using Microsoft.EntityFrameworkCore;

namespace Norso.API.Features
{
    public class MssqlVrimleContext : DbContext
    {
        public MssqlVrimleContext(DbContextOptions<MssqlVrimleContext> options) : base(options)
        {
        }

        protected MssqlVrimleContext()
        {
        }

        public DbSet<MssqlBusinessProfile> BusinessProfiles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MssqlBusinessProfile>(entity =>
            {
                entity.ToTable("BusinessProfiles", "dbo");
                entity.HasKey(e => e.Id)
                    .HasName("PK_BusinessProfiles");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.OrganizationNumber)
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.Description)
                    .HasMaxLength(1000);
                entity.Property(e => e.PhoneNumber)
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.EmailAddress)
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.Country)
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.PostalPlace)
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.PostalCode)
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.AddressLine)
                    .HasColumnType("nvarchar(max)");
                entity.Property(e => e.Latitude)
                    .HasColumnType("float(53)");
                entity.Property(e => e.Longitude)
                    .HasColumnType("float(53)");
            });
        }
    }
}
