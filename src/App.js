import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import SearchIcon from "./search.svg";
export const API_URL = "http://www.omdbapi.com/?apikey=95e51d87";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomMovie, setRandomMovie] = useState(null);

  const searchMovies = async (title) => {
    
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    clearRandomMovie();
    
  };

  const suggestRandomMovie = () => {
    // Generate a random index to select a movie from the stored list
    const randomIndex = Math.floor(Math.random() * movies.length);
    setRandomMovie(movies[randomIndex]);
   
    
  };

  const clearRandomMovie = () => {
    // Clear the random movie suggestion
    setRandomMovie(null);
  };


  useEffect(() => {
    searchMovies("woman");
  }, []);

  return (
    <Router basename="/RandomMovie">
      <div className="app">
        <h1 onClick={()=>{
          window.location.reload();
        }}>Search any movies</h1>
        <h1>Or,</h1>
        <button className="suggest-btn" onClick={suggestRandomMovie}>
          Suggest me a Movie
        </button>

        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="Search Icon"
            onClick={() => 
    
              searchMovies(searchTerm)}
          />
        </div>

        {randomMovie ? (
          <div className="container">
            <MovieCard key={randomMovie.imdbID} movie={randomMovie} />
  
          </div>
        ) : (
          movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found.</h2>
            </div>
          )
        )}
      </div>
    </Router>
  );
};

export default App;
