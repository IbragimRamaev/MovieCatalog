import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

export default function MovieCard({ movie, onAddFavorite }) {
    return (
        <Card
            sx={{
                width: 220,
                height: 340, // ✅ чуть меньше, чем было
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                },
            }}
        >
            {/* ✅ Изображение теперь лучше вписывается */}
            <CardMedia
                component="img"
                image={
                    movie.poster_path ||
                        movie.posterPath ||
                        movie.poster_Path
                        ? `https://image.tmdb.org/t/p/w342${movie.poster_path || movie.posterPath || movie.poster_Path
                        }`
                        : "https://via.placeholder.com/220x260?text=No+Image"
                }
                alt={movie.title}
                sx={{
                    height: 240,          // ✅ меньше, чтобы вписывалось идеально
                    objectFit: "contain", // ✅ сохраняет пропорции, без обрезки
                    backgroundColor: "#f8f8f8",
                }}
            />

            {/* ✅ Контент */}
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    p: 1.5,
                }}
            >
                {/* ✅ Название — только одна строка */}
                <Typography
                    variant="subtitle1"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        mb: 1,
                        whiteSpace: "nowrap",       // ❗ только одна строка
                        overflow: "hidden",         // ❗ скрывает остальное
                        textOverflow: "ellipsis",   // ❗ добавляет "..."
                        width: "100%",
                    }}
                >
                    {movie.title}
                </Typography>

                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{
                        fontSize: "0.7rem",
                        padding: "3px 8px",
                        textTransform: "uppercase",
                        borderRadius: "8px",
                    }}
                    onClick={() => onAddFavorite(movie)}
                >
                    Add to Favorites
                </Button>
            </CardContent>
        </Card>
    );
}
