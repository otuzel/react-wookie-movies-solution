import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Movie } from "../../types";
import MovieCard from "../../components/MovieCard";
import { useMovies, onFetchMovies } from "../../contexts/MoviesContext";

import { $SearchResultContainer } from "./styles";

const SearchResults = () => {
  const [{ error, loading, searchResults }, dispatch] = useMovies();
  const location = useLocation();

  const searchQuery =
    new URLSearchParams(location.search).get("q") ?? undefined;

  useEffect(() => {
    onFetchMovies(dispatch, searchQuery);
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
