import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SearchIcon from "../../icons/search-line.svg";

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

const SearchBox = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${term}`);
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

export default SearchBox;
