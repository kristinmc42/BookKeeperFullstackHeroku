import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <p>Book Keeper</p>
      <a href="https://github.com/kristinmc42/BookKeeperFullstackHeroku" target="_blank"
                rel="noreferrer">How I built this</a>
      <p>Designed by Kristin McCollum</p>
    </StyledFooter>
  );
};

export default Footer;

// styled components
const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.whiteText};
  padding-top: 1em;

  p, a {
    font-size: 0.8rem;
    padding: 10px 30px;
    color: ${(props) => props.theme.colors.whiteText};
  }
  p:first-of-type {
    font-family: ${(props) => props.theme.fonts.header};
  }
  p:nth-of-type(2) {
    text-align: right;
  }
  a{
    text-align: center;
  }
`;
