import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <p>Book Keeper</p>
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

  p {
    font-size: 0.8rem;
    padding: 10px 30px;
  }
  p:first-of-type {
    font-family: ${(props) => props.theme.fonts.header};
  }
  p:nth-of-type(2) {
    text-align: right;
  }
`;
