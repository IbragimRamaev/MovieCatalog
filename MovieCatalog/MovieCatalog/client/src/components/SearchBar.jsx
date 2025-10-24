import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}
        >
            <TextField
                label="Search Movies..."
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ width: "60%" }}
            />
            <Button type="submit" variant="contained" color="primary">
                Search
            </Button>
        </Box>
    );
}
