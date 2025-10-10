// Make sure you import EF Core namespace
using Microsoft.EntityFrameworkCore;
using MovieCatalog.server.Models;
using MovieCatalog.server.Models;

namespace server.Data
{
    // Must inherit from Microsoft.EntityFrameworkCore.DbContext
    public class AppDbContext : DbContext
    {
        // EF Core expects this options-based constructor
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Example table
        public DbSet<Favorite> Favorites { get; set; } = null!;
    }
}
