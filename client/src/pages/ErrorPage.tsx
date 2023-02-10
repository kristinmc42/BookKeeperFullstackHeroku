import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function ErrorPage() {
  return (
      <StyledMain>
          <h1>Oops! You seem to be lost.</h1>
          <p>Here are some helpful links.</p>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
    </StyledMain>
  )
}

const StyledMain = styled.main`
display: flex;
flex-direction: column;
justify-contents: center;
align-items: center;

`
