import React from "react";
import { Link } from "react-router-dom";

import SearchBox from "../SearchBox";

import { $Header, $Logo } from "./styles";

const Header = () => {
  return (
    <$Header>
      <$Logo>
        <Link to="/">
          WOOKIE
          <br />
          MOVIES
        </Link>
      </$Logo>
      <SearchBox />
    </$Header>
  );
};

export default Header;
