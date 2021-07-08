import React, { useEffect, useState } from "react";
import { Genres, Movie } from "../types";

import { useMovies } from "../contexts/MoviesContext";
import GenreRow from "../components/GenreRow";

const Home = () => {
  const [{ loading, movies }, { onFetchMovies }] = useMovies();
  const [genres, setGenres] = useState<Genres>();

  const groupByGenres = (movies: Movie[]): Genres => {
    const groups = movies.reduce<Genres>((genres, movie) => {
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
    if (!movies) {
      onFetchMovies();
    } else {
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
