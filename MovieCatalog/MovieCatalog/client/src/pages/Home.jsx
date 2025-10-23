// src/pages/Home.jsx
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/movieApi";

const Home = () => {
    const [movies, setMovies] = useState([]);

    const handleSearch = async (query) => {
        try {
            const data = await searchMovies(query);
            setMovies(data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <SearchBar onSearch={handleSearch} />

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Home;
