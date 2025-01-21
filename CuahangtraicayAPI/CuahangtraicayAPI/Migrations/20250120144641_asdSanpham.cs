using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CuahangtraicayAPI.Migrations
{
    /// <inheritdoc />
    public partial class asdSanpham : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Soluongtamgiu",
                table: "sanphams",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Soluongtamgiu",
                table: "sanphams");
        }
    }
}
