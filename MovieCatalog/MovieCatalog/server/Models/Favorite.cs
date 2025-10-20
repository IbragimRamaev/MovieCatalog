using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Favorite
    {
        [Key]
        public int Id { get; set; }

        // TMDB movie ID
        public int MovieId { get; set; }

        // Movie title
        [Required]
        public string Title { get; set; } = string.Empty;

        // Poster path (relative URL from TMDB)
        public string? PosterPath { get; set; }

        // Short description
        public string? Overview { get; set; }

        // Release date string (yyyy-MM-dd)
        public string? ReleaseDate { get; set; }
    }
}
