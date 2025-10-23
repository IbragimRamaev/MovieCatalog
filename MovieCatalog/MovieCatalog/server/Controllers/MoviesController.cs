using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}
