import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Movie } from "../types";

import { useMovies } from "../contexts/MoviesContext";

const SearchResults = () => {
  const [{ error, loading, movies }, { onFetchMovies }] = useMovies();
  const location = useLocation();

  const searchQuery =
    new URLSearchParams(location.search).get("q") ?? undefined;

  useEffect(() => {
    onFetchMovies(searchQuery);
  }, [searchQuery]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    throw error;
  }

  if (movies) {
    return (
      <>
        <h1>Search results for "{searchQuery}"</h1>
        {movies.map((movie: Movie) => (
          <Link key={movie.slug} to={`/${movie.slug}`}>
            <img src={movie.poster} />
          </Link>
        ))}
      </>
    );
  }

  return <p>No results</p>;
};

export default SearchResults;
