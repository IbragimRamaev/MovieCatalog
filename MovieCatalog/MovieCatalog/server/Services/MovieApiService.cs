using server.Models;


namespace server.Services
{
    public class MovieApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        // Construction inject HttpClient + reads TMDB API key from appsetings.json
        public MovieApiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["TMDB:ApiKey"];

        }


        /// <summary>
        /// Fetches movie data from TMDB by query (search term)
        /// </summary>
        public async Task<ApiResponse?> SearchMoviesAsync(string query)
        {
            if (string.IsNullOrEmpty(query))
                return null;

            if (string.IsNullOrEmpty(_apiKey) || _apiKey == "WIll_Add_Api")
                throw new InvalidOperationException("TMDB API key is missing. Please add your API key in appsettings.json.");

            string url = $"https://api.themoviedb.org/3/search/movie?api_key={_apiKey}&query={query}";

            try
            {
                var response = await _httpClient.GetFromJsonAsync<ApiResponse>(url);
                return response;
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Error fetching movies: {ex.Message}");
                return null;
            }
        }

        /// <summary>
        /// Fetches detailed info about a single movie by its ID
        /// </summary>
        public async Task<Movie?> GetMovieDetailsAsync(int id)
        {
            string url = $"https://api.themoviedb.org/3/movie/{id}?api_key={_apiKey}";
            return await _httpClient.GetFromJsonAsync<Movie>(url);
        }
    }
}
