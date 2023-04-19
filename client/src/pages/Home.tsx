import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

//components
import Button from "../components/Button";

//styles
import { device } from "../styles/Breakpoints";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <ImageContainer>
        <img
          src="https://media-public.canva.com/SFxWc/MAEnKsSFxWc/1/tl.jpg"
          alt="stacks of books filling the whole frame"
        />
      </ImageContainer>
      <TextContainer>
        <h1>
          <span>Book Keeper</span> is a virtual library.
        </h1>
        <p>
          It helps keep track of the books you have read, are currently reading,
          or want to read.
        </p>
        <Button onClick={() => navigate("/register")}>
          Register <FontAwesomeIcon icon={faRightLong} />
        </Button>
      </TextContainer>
    </Wrapper>
  );
};

export default Home;

// styled components
const Wrapper = styled.div`
  max-width: 1600px;
  width: 90%;
  margin: 1em auto;
  height: 79vh;
  min-height: 685px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: linear-gradient(
    to right top,
    #051937,
    #274967,
    #507e98,
    #81b7c9,
    #baf3f9
  );

  @media ${device.mobileL} {
    min-height: 560px;
  }
  @media ${device.tablet} {
    height: 84vh;
  }
  @media ${device.laptop} {
    height: 73vh;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
      to left bottom,
      #051937,
      #274967,
      #507e98,
      #81b7c9,
      #baf3f9
    );
    padding: 1em;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1em;

  h1,
  p {
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.whiteText};
    padding: 20px;
  }
  p{
    font-size: 1rem;
  }
  h1 > span {
    font-family: ${(props) => props.theme.fonts.header};
  }

  button {
    max-width: 150px;
    padding: 0.5em;
    margin: 1em 3em 1em 1em;
    font-weight: bold;
    color: ${(props) => props.theme.colors.whiteText};
    background-color: ${(props) => props.theme.colors.background};
    border: 1px solid ${(props) => props.theme.colors.background};

    &:hover {
      color: ${(props) => props.theme.colors.blackText};
      background-color: ${(props) => props.theme.colors.secondary};
      border: 1px solid ${(props) => props.theme.colors.secondary};
    }
  }
  @media ${device.tablet}{
    h1, p{
      padding: 40px;
    }
    h1{
      font-size: 2rem;
    }
    button{
      margin-left: 2em;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  max-height: 400px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};

  @media ${device.mobileL} {
    max-width: 740px;
    img {
      border: 1px solid ${(props) => props.theme.colors.black};
      border-radius: 15px;
      margin-top: 200px;
      max-width: 450px;
    }
  }

  @media ${device.tablet} {
    max-width: 900px;
    img {
      max-width: 450px;
    }
  }

  @media ${device.laptop} {
    max-width: 535px;
    height: 100%;
    padding: 2em;
    margin-left: 3em;
    background-color: ${(props) => props.theme.colors.background};
    border-radius: 15px;

    img {
      margin-top: 0;
    }
  }
`;
