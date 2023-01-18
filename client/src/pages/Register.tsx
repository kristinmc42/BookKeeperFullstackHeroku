import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

// types
import { UserObj } from "../types";

// styles
import styled from "styled-components";
import { device } from "../styles/Breakpoints";
import AuthHeader from "../components/AuthHeader";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 90%;
  margin: 0 auto;
  height: 100vh;

  @media (orientation: landscape) and (hover: none) and (pointer: coarse) and (max-width: 1023px){
    height: 100%;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 876px;
    margin: 30px auto ;

    h1 {
      margin-top: 40px;
      margin-bottom: 40px;

      @media ${device.mobileL}{
        margin-bottom: 75px;
        margin-top: 10px;
      }
      @media ${device.mobileM}{
        margin-top: 50px;
        margin-bottom: 50px;
      }
      @media (orientation: landscape) and (hover: none) and (pointer: coarse){
        margin-top: 50px;
        margin-bottom: 50px;
      }
    }

    form {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      max-width: 366px;
      gap: 3em;

     
      @media ${device.laptop} {
        flex-direction: row;
        justify-content: center;
        max-width: none;
      }


      label{
        @media ${device.mobileL} {
          :nth-of-type(2){
            margin-left:45px
          }
        }
      }

      input {
        display: block;
        margin-left: 0;
        margin-top: 8px;
        color: ${(props) => props.theme.colors.blackText};
        background-color: ${(props) => props.theme.colors.secondary};
        border: 3px solid ${(props) => props.theme.colors.secondary};
        border-radius: 5px;

        @media ${device.mobileL} {
          margin-left: 10px;
          display: inline;

          :nth-of-type(2){
            margin-left:45px
          }
        }
      }

      p {
        text-align: center;

        a {
          color: ${(props) => props.theme.colors.secondary};
        }
      }

      button {
        max-width: 110px;
      }
    }
  }

  h1,
  p,
  label {
    color: ${(props) => props.theme.colors.whiteText};
  }
`;

const Register: React.FC = () => {
  // values from input fields inputted by user
  const [inputs, setInputs] = useState<UserObj>({
    username: "",
    email: "",
    password: "",
  });

  // for hiding/showing text in password input field
  const [isShown, setIsShown] = useState<boolean>(false);

  // error in axios call
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sets state as user input changes in all fields
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    // makes axios post call when user clicks register button
    e.preventDefault();
    try {
      // if registration successful, redirects user to login page
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err: unknown | any) {
      // sets error message in state
      setError(err.response.data);

    }
  };

  return (
    <Wrapper>
      <AuthHeader to="/" title="home">
        Book Keeper
      </AuthHeader>
      <main>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="usernameRegister">
            Username:
            <input
              required
              type="text"
              id="usernameRegister"
              name="username"
              onChange={handleChange}
              />
          </label>
          <label htmlFor="email">
            Email:
            <input
              required
              type="email"
              id="emailRegister"
              name="email"
              onChange={handleChange}
              />
          </label>
          <label htmlFor="password">
            Password:
            <input
              required
              type={isShown ? "text" : "password"}
              id="passwordRegister"
              name="password"
              onChange={handleChange}
              />
          </label>
          <label htmlFor="showPassword">
            Show password?
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={isShown}
              onChange={() => setIsShown((isShown) => !isShown)}
              />
          </label>
              {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          <Button type="submit">Register</Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </main>
    </Wrapper>
  );
};

export default Register;
