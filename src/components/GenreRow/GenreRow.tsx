import React from "react";
import { Link } from "react-router-dom";

import { Movie } from "../../types";

import { $Movie, $Row, $RowMovies, $RowTitle } from "./styles";

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
          <$Movie key={movie.slug}>
            <Link to={movie.slug}>
              <img src={movie.poster} />
            </Link>
          </$Movie>
        ))}
      </$RowMovies>
    </$Row>
  );
};

export default GenreRow;
