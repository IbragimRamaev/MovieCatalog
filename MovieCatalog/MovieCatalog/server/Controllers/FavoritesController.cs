using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly FavoriteService _favoriteService;

        public FavoritesController(FavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            var result = await _favoriteService.GetAllFavoritesAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody] Favorite favorite)
        {
            await _favoriteService.AddFavoriteAsync(favorite);
            return Ok(favorite);
        }

        [HttpDelete("{movieId}")]
        public async Task<IActionResult> DeleteFavorite(int movieId)
        {
            var deleted = await _favoriteService.RemoveFavoriteAsync(movieId);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
