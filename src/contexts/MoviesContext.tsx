import React, { createContext, useContext, useReducer } from "react";
import { Movie } from "../types";

const API_TOKEN = process.env.API_TOKEN;
const API_URL = process.env.API_URL;

enum ActionType {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  FETCH_RESOLVED = "FETCH_RESOLVED",
  SEARCH_RESOLVED = "SEARCH_RESOLVED",
}

type State = {
  error: Error | null;
  loading: Boolean;
  movies: Movie[] | null;
  searchResults: Movie[] | null;
};

type Action =
  | { type: ActionType.PENDING }
  | { type: ActionType.REJECTED; error: Error }
  | { type: ActionType.FETCH_RESOLVED; movies: Movie[] }
  | { type: ActionType.SEARCH_RESOLVED; movies: Movie[] };

type ContextProps = [state: State, dispatch: React.Dispatch<Action>];

const initialState: State = {
  error: null,
  loading: false,
  movies: null,
  searchResults: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.PENDING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.REJECTED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ActionType.FETCH_RESOLVED:
      return {
        ...state,
        loading: false,
        movies: action.movies,
      };
    case ActionType.SEARCH_RESOLVED:
      return {
        ...state,
        loading: false,
        searchResults: action.movies,
      };
    default:
      throw new Error();
  }
};

const MoviesContext = createContext<ContextProps>([{} as State, () => {}]);

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = (
  props: React.PropsWithChildren<{}>
): React.ReactElement => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { error } = state;

  if (error) {
    throw error;
  }

  return (
    <MoviesContext.Provider value={[state, dispatch]}>
      {children}
    </MoviesContext.Provider>
  );
};

export const onFetchMovies = async (
  dispatch: React.Dispatch<Action>,
  query?: string
) => {
  dispatch({ type: ActionType.PENDING });

  const baseUrl = `${API_URL}/movies`;
  const url = query ? `${baseUrl}?q=${query}` : baseUrl;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      dispatch({
        type: ActionType.REJECTED,
        error: new Error(response.status.toString()),
      });
    } else {
      const { movies } = await response.json();

      dispatch({
        type: query ? ActionType.SEARCH_RESOLVED : ActionType.FETCH_RESOLVED,
        movies,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionType.REJECTED,
      error,
    });
  }
};
