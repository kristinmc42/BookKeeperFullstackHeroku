import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../config";

// components
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import AuthHeader from "../components/AuthHeader";

// styles
import styled from "styled-components";
import { device } from "../styles/Breakpoints";
// types

import { UserObj } from "../types";
import { AxiosResponse } from "axios";
interface RegisterObj extends UserObj {
  confirmPassword?: string;
}

const Register: React.FC = () => {
  // values from input fields inputted by user
  const [inputs, setInputs] = useState<RegisterObj>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // for hiding/showing text in password input field
  const [isShown, setIsShown] = useState<boolean>(false);

  // error in axios call
  const [error, setError] = useState<string | undefined | null>();
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sets state as user input changes in all fields
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
    setPasswordError(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    // makes axios post call when user clicks register button
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      try {
        // if registration successful, redirects user to login page
        await Axios.post(`/api/auth/register`, inputs);
        navigate("/login");
      } catch (err: unknown | any) {
        const errorResponse: AxiosResponse<unknown, any> | undefined =
          err.response;
        const errorStatus: number | undefined = errorResponse?.status;
        let errorMessage: string | undefined;
        if (typeof errorResponse?.data === "string") {
          errorMessage = errorResponse?.data;
        }
        switch (errorStatus) {
          case 400:
          case 401:
            setError(errorMessage);
            break;
          case 404:
          case 500:
          default:
            setError(
              "Oops! Something went wrong. Please refresh and try again."
            );
        }
      }
    }
  };

  return (
    <Wrapper>
      <AuthHeader to="/" title="home">
        Book Keeper
      </AuthHeader>
      <main>
        <h1>Register</h1>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel htmlFor="usernameRegister">
            Username:
            <StyledInput
              required
              type="text"
              id="usernameRegister"
              name="username"
              onChange={handleChange}
            />
          </StyledLabel>
          <StyledLabel htmlFor="email">
            Email:
            <StyledInput
              required
              type="email"
              id="emailRegister"
              name="email"
              onChange={handleChange}
            />
          </StyledLabel>
          <StyledLabel htmlFor="password">
            <span>
              Password:
              {passwordError && <p>{passwordError}</p>}
            </span>
            <StyledInput
              required
              type={isShown ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
              color={passwordError ? "red" : "#baf3f9"}
            />
          </StyledLabel>
          <StyledLabel htmlFor="confirmPassword">
            Re-enter Password:
            <StyledInput
              required
              type={isShown ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              value={inputs.confirmPassword}
              color={passwordError ? "red" : "#baf3f9"}
            />
          </StyledLabel>

          <StyledLabel htmlFor="showPassword">
            Show password?
            <StyledInput
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={isShown}
              onChange={() => setIsShown((isShown) => !isShown)}
            />
          </StyledLabel>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          <Button type="submit">Register</Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </StyledForm>
      </main>
    </Wrapper>
  );
};

export default Register;

// styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 90%;
  margin: 0 auto;
  height: 100vh;

  @media (orientation: landscape) and (hover: none) and (pointer: coarse) and (max-width: 1023px) {
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
    margin: 20px auto;

    h1 {
      margin-top: 40px;
      margin-bottom: 40px;

      @media ${device.mobileL} {
        margin-bottom: 75px;
        margin-top: 10px;
      }
      @media ${device.mobileM} {
        margin-top: 20px;
        margin-bottom: 30px;
      }
      @media (orientation: landscape) and (hover: none) and (pointer: coarse) {
        margin-top: 10px;
        margin-bottom: 50px;
      }
    }
  }

  h1,
  p,
  label {
    color: ${(props) => props.theme.colors.whiteText};
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  max-width: 366px;
  gap: 1em;
  margin-bottom: 2em;

  @media ${device.tablet} {
    align-items: flex-start;
    max-width: 446px;
  }

  p {
    text-align: center;
    align-self: center;
    a {
      color: ${(props) => props.theme.colors.secondary};
    }
  }

  button:first-of-type {
    align-self: center;
    max-width: 110px;
    margin: 1em auto;
  }
`;

const StyledLabel = styled.label.attrs((props) => ({
  color: props.color,
}))`
  max-width: 446px;
  width: 100%;

  &:nth-of-type(3) {
    display: flex;
    flex-wrap: wrap;
    span {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
    }
    p {
      text-align: left;
      display: block;
      color: red;

      @media ${device.mobileM} {
        display: inline;
        padding-left: 2%;
      }
    }
  }
  &:nth-of-type(3),
  &:nth-of-type(4) {
    color: ${(props) => props.color};
  }

  &:last-of-type {
    align-self: center;
    width: 200px;
    input {
      display: inline;
      width: 20px;
      margin-left: 10px;
    }
  }
`;

const StyledInput = styled.input.attrs((props) => ({
  color: props.color,
}))`
  margin-left: 0;
  margin-top: 8px;
  color: ${(props) => props.theme.colors.blackText};
  background-color: ${(props) => props.theme.colors.secondary};
  border: 3px solid ${(props) => props.color};
  border-radius: 5px;
  width: 100%;
`;
