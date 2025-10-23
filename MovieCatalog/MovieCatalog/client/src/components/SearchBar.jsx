// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    width: "300px",
                }}
            />
            <button
                type="submit"
                style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 20px",
                    cursor: "pointer",
                }}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
