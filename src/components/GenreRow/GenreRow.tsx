import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Movie } from "../../types";

const $Row = styled.div`
  margin-bottom: 30px;
  overflow-x: auto;
`;

const $RowTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 15px;
`;

const $RowMovies = styled.div`
  display: flex;
  flex-direction: row;
`;
const $Movie = styled.div`
  & + & {
    margin-left: 15px;
  }
`;

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
