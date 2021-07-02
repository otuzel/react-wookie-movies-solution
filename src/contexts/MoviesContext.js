import React, { createContext, useEffect, useState } from "react";

export const MoviesContext = createContext(null);

export const MoviesContextProvider = (props) => {
  const { children } = props;
  const TOKEN = "Wookie2019";

  const [state, setState] = useState({
    error: null,
    movies: null,
    status: "idle",
  });

  const fetchMovies = async () => {
    setState({ ...state, status: "pending" });

    try {
      const response = await fetch("https://wookie.codesubmit.io/movies", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        setState({
          ...state,
          error: new Error(response.status),
          status: "rejected",
        });
      } else {
        const { movies } = await response.json();
        setState({ ...state, movies, status: "resolved" });
      }
    } catch (error) {
      setState({ ...state, error, status: "rejected" });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (state.error) {
    throw state.error;
  }

  return (
    <MoviesContext.Provider
      value={{
        loading: state.status === "pending",
        movies: state.movies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
