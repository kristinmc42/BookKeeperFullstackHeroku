import React from "react";

// styles
import styled from "styled-components";
// types
interface ErrorProps {
  children: React.ReactNode;
}

// sstyled component
const StyledError = styled.h2`
  color: red;
  font-size: 1rem;
`;

export default function ErrorMessage({ children }: ErrorProps) {
  return <StyledError>{children}</StyledError>;
}
