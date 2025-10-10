namespace MovieCatalog.server.Models
{
    public class ApiResponse
    {
        public int Page { get; set; }
        public List<Movie>? Results { get; set; }
        public int Total_Results { get; set; }
        public int Total_Pages { get; set; }
    }
}

