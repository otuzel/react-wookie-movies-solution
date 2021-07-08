import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SearchBox from "../SearchBox";

const $Header = styled.div`
  border-bottom: 2px solid #1a1d21;
  display: flex;
  height: 90px;
  padding: 20px 15px 15px;
`;

const $Logo = styled.div`
  height: 55px;
  width: 135px;
  > a {
    text-decoration: none;
    color: inherit;
  }
`;

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
