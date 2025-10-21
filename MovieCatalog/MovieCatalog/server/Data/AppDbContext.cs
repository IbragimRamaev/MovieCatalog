using Microsoft.EntityFrameworkCore;
using MovieCatalog.server.Models;
using server.Models;

namespace server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Movie> Movies { get; set; }

        public DbSet<Favorite> Favorites { get; set; } = null!;
    }
}
