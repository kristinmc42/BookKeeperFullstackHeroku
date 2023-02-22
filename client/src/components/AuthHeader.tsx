import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// styles
import { device } from "../styles/Breakpoints";

// types
interface PropTypes {
  children: React.ReactNode;
  to: string;
  title?: string;
}

// header for Login and Register pages

export default function AuthHeader({ children, to, title }: PropTypes) {
  return (
    <StyledHeader>
      <Link to={to} title={title}>
        {children}
      </Link>
    </StyledHeader>
  );
};

// styled components

const StyledHeader = styled.header`
  padding-top: 20px;
  a {
    color: ${(props) => props.theme.colors.whiteText};
    font-family: ${(props) => props.theme.fonts.header};
    font-size: 1.8rem;

    @media ${device.mobileS} {
      font-size: 2rem;
    }
  }
`;