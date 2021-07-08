import styled from "styled-components";

export const $Row = styled.div`
  margin-bottom: 30px;
  overflow-x: auto;
`;

export const $RowTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 15px;
`;

export const $RowMovies = styled.div`
  display: flex;
  flex-direction: row;
`;
export const $Movie = styled.div`
  & + & {
    margin-left: 15px;
  }
`;
