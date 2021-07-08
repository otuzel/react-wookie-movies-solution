import React from "react";

import { Movie } from "../../types";
import MovieCard from "../MovieCard";

import { $Row, $RowMovies, $RowTitle } from "./styles";

type GenreProps = {
  genreName: string;
  movies: Movie[];
};

const GenreRow = (props: GenreProps) => {
  const { movies, genreName } = props;

  return (
    <$Row>
      <$RowTitle>{`${genreName} (${movies.length})`}</$RowTitle>
      <$RowMovies>
        {movies.map((movie) => (
          <MovieCard key={movie.slug} movie={movie} />
        ))}
      </$RowMovies>
    </$Row>
  );
};

export default GenreRow;
