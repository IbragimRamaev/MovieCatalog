// src/api/movieApi.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5271/api"; // port from Program.cs

//search movie by backend → TMDB API
export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies/search`, {
            params: { query },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
};

// add favotites addFavorite = async (favorite) => {
export const addFavorite = async (favorite) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/favorites`, favorite);
        return response.data;
    } catch (error) {
        console.error("Error adding favorite:", error);
        throw error;
    }
};

//get alll favorite movies
export const getFavorites = async () => {
    const response = await axios.get(`${API_BASE_URL}/favorites`);
    return response.data;
};

// Delete from favorite movies
export const deleteFavorite = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/favorites/${id}`);
    return response.data;
};

export const getMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};
