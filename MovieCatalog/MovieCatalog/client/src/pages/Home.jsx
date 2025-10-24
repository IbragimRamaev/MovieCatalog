import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies, addFavorite } from "../api/movieApi";

export default function Home() {
    const [movies, setMovies] = useState([]);

    const handleSearch = async (query) => {
        try {
            const data = await searchMovies(query);
            setMovies(data?.results || []);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    const handleAddFavorite = async (movie) => {
        await addFavorite({
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            overview: movie.overview,
            releaseDate: movie.release_date,
        });
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                🎬 Movie Catalog
            </Typography>

            <SearchBar onSearch={handleSearch} />


            <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>

                {movies.map((movie) => (
                    <Grid
                        item
                        key={movie.id}
                        xs={12} sm={6} md={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <MovieCard movie={movie} onAddFavorite={handleAddFavorite} />
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
}
