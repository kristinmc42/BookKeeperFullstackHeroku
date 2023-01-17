import React from "react";
import styled from "styled-components";

// styles
const Wrapper = styled.div`
  max-width: 1600px;
  width: 90%;
  margin: 0 auto;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h1, p{
    color:${props => props.theme.colors.whiteText};
  }
  h1 > span {
    font-family: ${props => props.theme.fonts.header}
  }
`
const Home: React.FC = () => {
  return (
    <Wrapper>
      <h1><span>Book Keeper</span> is a virtual library.</h1>
      <p>
        It helps keep track of the books you have read, are currently reading,
        or want to read.
      </p>
    </Wrapper>
  );
};

export default Home;
