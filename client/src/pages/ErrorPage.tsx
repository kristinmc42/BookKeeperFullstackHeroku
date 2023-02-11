import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage() {
  return (
    <StyledContainer>
      <h1>Book Keeper</h1>
      <h2>Oops! You seem to be lost.</h2>
      <p>Here are some helpful links.</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </StyledContainer>
  );
}

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;

  h1,
  h2,
  p,
  a {
    padding: 1em;
  }
  h1 {
    font-family: ${(props) => props.theme.fonts.header};
  }
  a {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
