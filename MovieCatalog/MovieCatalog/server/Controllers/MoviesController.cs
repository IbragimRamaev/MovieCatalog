using Microsoft.AspNetCore.Mvc;
using MovieCatalog.server.Services;

namespace MovieCatalog.server.Controllers
{
    public class MoviesController: ControllerBase
    {
        private readonly MovieApiService _movieApi;
        public MoviesController(MovieApiService movieApi)
        {
            _movieApi = movieApi;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            var result = await _movieApi.SearchMoviesAsync(query);
            return Ok(result);
        }
    }
}
