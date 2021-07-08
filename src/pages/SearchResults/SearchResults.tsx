import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Movie } from "../../types";
import MovieCard from "../../components/MovieCard";
import { useMovies } from "../../contexts/MoviesContext";

import { $SearchResultContainer } from "./styles";

const SearchResults = () => {
  const [{ error, loading, searchResults }, { onFetchMovies }] = useMovies();
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

  if (searchResults) {
    return (
      <>
        <h1>Search results for "{searchQuery}"</h1>
        <$SearchResultContainer>
          {searchResults.map((movie: Movie) => (
            <MovieCard key={movie.slug} movie={movie} />
          ))}
        </$SearchResultContainer>
      </>
    );
  }

  return <p>No results</p>;
};

export default SearchResults;
