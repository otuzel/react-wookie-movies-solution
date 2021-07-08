import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Movie } from "../../types";

import { useMovies } from "../../contexts/MoviesContext";

import {
  $Wrapper,
  $Image,
  $MovieDetails,
  $Header,
  $TitleWrapper,
  $Title,
  $Metadata,
  $Score,
  $Description,
} from "./styles";

const Details = () => {
  const { slug } = useParams();
  const [{ movies }, { onFetchMovies }] = useMovies();
  const [selected, setSelected] = useState<Movie | undefined>();

  let releaseYear;

  useEffect(() => {
    if (movies) {
      setSelected(movies.find((movie) => movie.slug === slug));
    } else {
      onFetchMovies();
    }
  }, [movies]);

  if (selected) {
    releaseYear = new Date(selected.released_on).getFullYear();
  }

  return selected ? (
    <$Wrapper>
      <$Image>
        <img src={selected.poster} />
      </$Image>
      <$MovieDetails>
        <$Header>
          <$TitleWrapper>
            <$Title>{selected.title}</$Title>
            <$Metadata>
              {releaseYear} | {selected.length} | {selected.director}
              <br />
              Cast: {selected.cast.join(", ")}
            </$Metadata>
          </$TitleWrapper>
          <$Score>IMDB Score: {selected.imdb_rating}</$Score>
        </$Header>
        <$Description>{selected.overview}</$Description>
      </$MovieDetails>
    </$Wrapper>
  ) : null;
};

export default Details;
