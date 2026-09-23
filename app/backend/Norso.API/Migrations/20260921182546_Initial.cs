using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Norso.API.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "business_profiles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    organization_number = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    address_line = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    postal_code = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    phone_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    email_address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    country = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    postal_place = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    longitude = table.Column<double>(type: "double precision", precision: 9, scale: 5, nullable: true),
                    latitude = table.Column<double>(type: "double precision", precision: 8, scale: 5, nullable: true),
                    description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_business_profiles", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "business_profiles");
        }
    }
}
