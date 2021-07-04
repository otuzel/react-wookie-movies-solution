import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TOKEN = process.env.API_TOKEN;

const SearchResults = (props) => {
  const location = useLocation();

  const [state, setState] = useState({
    error: null,
    results: null,
    status: "idle",
  });

  const term = location.search;
  const searchQuery = new URLSearchParams(location.search).get("term");

  const searchMovies = async () => {
    setState({ ...state, status: "pending" });

    try {
      const response = await fetch(
        `https://wookie.codesubmit.io/movies?q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        setState({
          ...state,
          error: new Error(response.status),
          status: "rejected",
        });
      } else {
        const { movies } = await response.json();
        setState({ ...state, results: movies, status: "resolved" });
      }
    } catch (error) {
      setState({ ...state, error, status: "rejected" });
    }
  };

  useEffect(() => {
    searchMovies();
  }, [term]);

  switch (state.status) {
    case "idle":
      return null;
    case "pending":
      return <h1>Loading...</h1>;
    case "rejected":
      throw state.error;
    case "resolved":
      return (
        <>
          <h1>Search results for "{searchQuery}"</h1>
          {state.results.length > 0 ? (
            state.results.map((movie) => (
              <Link key={movie.slug} to={`/${movie.slug}`}>
                <img src={movie.poster} />
              </Link>
            ))
          ) : (
            <p>No results</p>
          )}
        </>
      );
  }
};

export default SearchResults;
