import React, { createContext, useContext, useReducer } from "react";
import { Movie } from "../types";

const API_TOKEN = process.env.API_TOKEN;
const API_URL = process.env.API_URL;

enum ActionType {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  RESOLVED = "RESOLVED",
}

type State = {
  error: Error | null;
  loading: Boolean;
  movies: Movie[] | null;
};

type Handlers = {
  onFetchMovies: (query?: string) => void;
};

type Action =
  | { type: ActionType.PENDING }
  | { type: ActionType.REJECTED; error: Error }
  | { type: ActionType.RESOLVED; movies: Movie[] };

type ContextProps = [state: State, handlers: Handlers];

const initialState: State = {
  error: null,
  loading: false,
  movies: null,
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
    case ActionType.RESOLVED:
      return {
        ...state,
        loading: false,
        movies: action.movies,
      };
    default:
      throw new Error();
  }
};

const MoviesContext = createContext<ContextProps>([
  {} as State,
  {} as Handlers,
]);

export const useMovies = () => useContext(MoviesContext);

export const MoviesContextProvider = (
  props: React.PropsWithChildren<{}>
): React.ReactElement => {
  const { children } = props;

  const [{ error, loading, movies }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const onFetchMovies = async (query?: string) => {
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
          type: ActionType.RESOLVED,
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

  if (error) {
    throw error;
  }

  return (
    <MoviesContext.Provider
      value={[{ error, loading, movies }, { onFetchMovies }]}
    >
      {children}
    </MoviesContext.Provider>
  );
};
