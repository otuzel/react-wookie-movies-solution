import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import { MoviesContextProvider } from "./contexts/MoviesContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Details from "./pages/Details";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

const GlobalStyle = createGlobalStyle`
*, *:before, *:after {
  box-sizing: border-box;
}

body {
  background-color: #d8d8d8;
  color: #222;
  font-family: sans-serif;
  margin: 0px;
  padding: 0px;
}
`;

const $Page = styled.div`
  padding: 40px 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <ErrorBoundary>
          <MoviesContextProvider>
            <$Page>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:slug" element={<Details />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </$Page>
          </MoviesContextProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
};

export default App;
