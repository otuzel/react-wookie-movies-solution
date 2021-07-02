import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SearchIcon from "../icons/search-line.svg";

const $Search = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const $SearchIcon = styled.div`
  margin-right: 5px;
  margin-top: 3px;
`;

const $SearchInput = styled.input`
  height: 25px;
`;

const Search = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?term=${term}`);
    }
  };

  return (
    <$Search>
      <$SearchIcon>
        <SearchIcon />
      </$SearchIcon>
      <$SearchInput
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search movie..."
        value={term}
      ></$SearchInput>
    </$Search>
  );
};

export default Search;
