// src/components/MovieCard.jsx
import React from "react";
import { addFavorite } from "../api/movieApi";

const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";

    const handleAddFavorite = async () => {
        try {
            const favorite = {
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                overview: movie.overview,
                releaseDate: movie.release_date,
            };

            await addFavorite(favorite);
            alert(`"${movie.title}" added to favorites!`);
        } catch (error) {
            console.error("Error adding favorite:", error);
            alert("❌ Failed to add to favorites");
        }
    };

    return (
        <div
            style={{
                width: "200px",
                margin: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                overflow: "hidden",
                textAlign: "center",
            }}
        >
            <img src={posterUrl} alt={movie.title} style={{ width: "100%" }} />
            <h4 style={{ padding: "10px" }}>{movie.title}</h4>
            <p style={{ fontSize: "12px", padding: "0 10px" }}>{movie.release_date}</p>

            {/* кнопка добавления в избранное */}
            <button
                onClick={handleAddFavorite}
                style={{
                    backgroundColor: "#ffcc00",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    cursor: "pointer",
                }}
            >
                ⭐ Add to Favorites
            </button>
        </div>
    );
};

export default MovieCard;
