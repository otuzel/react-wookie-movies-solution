import React, { useContext, useEffect, useState } from "react";

import { MoviesContext } from "../contexts/MoviesContext";
import GenreRow from "../components/GenreRow";

const Home = () => {
  const { loading, movies } = useContext(MoviesContext);
  const [genres, setGenres] = useState();

  const groupByGenres = (movies) => {
    const groups = movies.reduce((genres, movie) => {
      movie.genres.forEach((genre) => {
        if (!genres.hasOwnProperty(genre)) {
          genres[genre] = [movie];
        } else {
          genres[genre].push(movie);
        }
      });

      return genres;
    }, {});
    return groups;
  };

  useEffect(() => {
    if (movies) {
      const genres = groupByGenres(movies);
      setGenres(genres);
    }
  }, [movies]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {genres
        ? Object.entries(genres).map(([genre, movies]) => (
            <GenreRow genreName={genre} key={genre} movies={genres[genre]} />
          ))
        : null}
    </>
  );
};

export default Home;
