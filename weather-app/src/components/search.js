import React, { useState } from "react";
import API from '../api.js';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const getLocationData = (inputValue) => {
        fetch(`${API.geocodingURLBase}search?name=${inputValue}&count=1&language=en&format=json`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(response => {

            const searchData = {
                countryName: response.results[0].country,
                cityName: response.results[0].name,
                latitude: response.results[0].latitude,
                longitude: response.results[0].longitude,
            };

            // Call the onSearchChange function with the searchData
            onSearchChange(searchData);
            setErrorMessage(""); // Clear any previous error message
        })
        .catch(err => {
            //console.error(err);
            setErrorMessage("City not found");
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        getLocationData(search); // Call the asynchronous action
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder="Enter location name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
}

export default Search;
