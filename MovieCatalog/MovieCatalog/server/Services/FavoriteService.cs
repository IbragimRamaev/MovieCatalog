using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class FavoriteService
    {
        private readonly AppDbContext _context;

        public FavoriteService(AppDbContext context)
        {
            _context = context;
        }

        // Add a new favorite
        public async Task<Favorite> AddFavoriteAsync(Favorite favorite)
        {
            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();
            return favorite;
        }

        // Get all favorites
        public async Task<List<Favorite>> GetAllFavoritesAsync()
        {
            return await _context.Favorites.AsNoTracking().ToListAsync();
        }

        // Remove by TMDB movie ID
        public async Task<bool> RemoveFavoriteAsync(int movieId)
        {
            var fav = await _context.Favorites.FirstOrDefaultAsync(f => f.MovieId == movieId);
            if (fav == null) return false;

            _context.Favorites.Remove(fav);
            await _context.SaveChangesAsync();
            return true;
        }

        // Check if exists
        public async Task<bool> IsFavoriteAsync(int movieId)
        {
            return await _context.Favorites.AnyAsync(f => f.MovieId == movieId);
        }
    }
}
