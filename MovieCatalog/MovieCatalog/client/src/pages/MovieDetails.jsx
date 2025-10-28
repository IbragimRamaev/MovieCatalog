import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Typography, Chip, CircularProgress } from "@mui/material";
import { getMovieDetails } from "../api/movieApi";

// small helpers to avoid "undefined" urls
const img = {
    poster: (p) =>
        p
            ? `https://image.tmdb.org/t/p/w500${p}`
            : "https://via.placeholder.com/500x750?text=No+Image",
    backdrop: (b, p) => {
        if (b) return `https://image.tmdb.org/t/p/w1280${b}`;
        if (p) return `https://image.tmdb.org/t/p/w780${p}`; // 🔄 если нет backdrop, используем постер
        return "https://via.placeholder.com/1280x720?text=No+Backdrop";
    },
};

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (e) {
                console.error("Error fetching movie details:", e);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ mt: 10, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }
    if (!movie) {
        return (
            <Container sx={{ mt: 10, textAlign: "center" }}>
                <Typography variant="h6" color="error">Movie not found</Typography>
            </Container>
        );
    }


    // accept different shapes (poster_path, posterPath, poster_Path)
    const posterPath = movie.poster_path || movie.posterPath || movie.poster_Path;
    const backdropPath = movie.backdrop_path || movie.backdropPath || movie.backdrop_Path;
    console.log("🖼️ Backdrop full URL:", img.backdrop(backdropPath));
    return (
        <Box sx={{ position: "relative", minHeight: "100vh", color: "#fff" }}>
            {/* Backdrop */}
            {backdropPath && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "100vh",
                        backgroundImage: `url(${img.backdrop(
                            movie.backdrop_path || movie.backdropPath,
                            movie.poster_path || movie.posterPath
                        )})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(10px)",
                        transform: "scale(1.05)",
                        zIndex: 0,
                    }}
                />
            )}

            {/* Контент */}
            <Container
                sx={{
                    position: "relative",
                    zIndex: 1,
                    pt: { xs: 4, md: 8 },
                    pb: 6,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 4,
                    flexDirection: { xs: "column", md: "row" }, // ✅ текст справа на desktop
                }}
            >
                {/* Левая колонка — постер */}
                <Box
                    sx={{
                        flexShrink: 0,
                        width: { xs: 220, sm: 280, md: 340 },
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 6,
                    }}
                >
                    <img
                        src={img.poster(posterPath)}
                        alt={movie.title}
                        style={{ display: "block", width: "100%", height: "auto" }}
                    />
                </Box>

                {/* Правая колонка — текст */}
                <Box sx={{ flex: 1, color: "white" }}>
                    <Typography variant="h3" sx={{ fontWeight: 800 }} gutterBottom>
                        {movie.title}{" "}
                        {movie.release_date && (
                            <Typography component="span" variant="h4" sx={{ opacity: 0.8 }}>
                                ({movie.release_date.slice(0, 4)})
                            </Typography>
                        )}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                        {movie.adult && <Chip label="18+" color="error" size="small" />}
                        {movie.genres?.map((g) => (
                            <Chip key={g.id || g.name} label={g.name} variant="outlined" size="small" />
                        ))}
                    </Box>

                    <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
                        ⭐ {movie.vote_average?.toFixed(1) ?? "—"} · 🗓 {movie.release_date || "Unknown"}
                    </Typography>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        Overview
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: 900, lineHeight: 1.7 }}>
                        {movie.overview || "No overview available."}
                    </Typography>
                </Box>

            </Container>

        </Box>
    );
}
