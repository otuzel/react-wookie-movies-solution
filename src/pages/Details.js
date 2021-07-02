import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { MoviesContext } from "../contexts/MoviesContext";

const $Wrapper = styled.div`
  display: flex;
`;

const $Image = styled.div`
  margin-right: 30px;
`;

const $MovieDetails = styled.div`
  flex: 1;
`;

const $Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const $TitleWrapper = styled.div``;

const $Title = styled.h2``;

const $Metadata = styled.div`
  margin-bottom: 20px;
`;

const $Score = styled.div`
  margin-left: auto;
`;

const $Description = styled.div``;

const Details = () => {
  const { slug } = useParams();
  const { movies } = useContext(MoviesContext);

  let selected;
  let releaseYear;

  if (movies) {
    selected = movies.find((movie) => movie.slug === slug);
  }

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
