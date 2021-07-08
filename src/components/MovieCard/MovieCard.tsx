import React from "react";
import { Link } from "react-router-dom";

import { Movie } from "../../types";

import { $MovieCard } from "./styles";

type MovieProps = {
  movie: Movie;
};

const MovieCard = (props: MovieProps) => {
  const { movie } = props;

  return (
    <$MovieCard>
      <Link to={`/${movie.slug}`}>
        <img src={movie.poster} />
      </Link>
    </$MovieCard>
  );
};

export default MovieCard;
