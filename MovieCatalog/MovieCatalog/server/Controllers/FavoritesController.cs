using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

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
        public async Task<IActionResult> GetAll()
        {
            var list = await _favoriteService.GetAllFavoritesAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Favorite favorite)
        {
            var exists = await _favoriteService.IsFavoriteAsync(favorite.MovieId);
            if (exists)
                return Conflict("This movie is already in favorites.");

            var result = await _favoriteService.AddFavoriteAsync(favorite);
            return Ok(result);
        }

        [HttpDelete("{movieId}")]
        public async Task<IActionResult> Remove(int movieId)
        {
            var success = await _favoriteService.RemoveFavoriteAsync(movieId);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
