import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

//components
import Button from "../components/Button";
import AuthHeader from "../components/AuthHeader";
import ErrorMessage from "../components/ErrorMessage";

// styles
import { device } from "../styles/Breakpoints";

// types
import { UserObj } from "../types";
import { AxiosError, AxiosResponse } from "axios";

const Login = () => {
  // values from input fields inputted by user
  const [inputs, setInputs] = useState<UserObj>({
    email: "",
    password: "",
  });

  // error in axios call
  const [error, setError] = useState<string | undefined>();

  const navigate = useNavigate();

  const userContext = useContext(AuthContext);

  if (!userContext) return null;

  const { login } = userContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sets state as user input changes in all fields
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(undefined);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(undefined);

    const user = await login(inputs).catch((err: AxiosError) => {
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
          setError("Oops! Something went wrong. Please refresh and try again.");
      }
    });

    if (user) navigate("/books");
  };

  return (
    <Wrapper>
      <AuthHeader to="/" title="home">
        Book Keeper
      </AuthHeader>
      <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailLogin">
            Email:
            <input
              required
              type="email"
              id="emailLogin"
              name="email"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="passwordLogin">
            Password:
            <input
              required
              type="password"
              id="passwordLogin"
              name="password"
              onChange={handleChange}
            />
          </label>
          <Button type="submit">Login</Button>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </main>
    </Wrapper>
  );
};

export default Login;

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
    margin: 30px auto;

    h1 {
      margin-top: 40px;
      margin-bottom: 40px;

      @media ${device.mobileL} {
        margin-bottom: 75px;
        margin-top: 10px;
      }
      @media ${device.mobileM} {
        margin-top: 50px;
        margin-bottom: 50px;
      }
      @media (orientation: landscape) and (hover: none) and (pointer: coarse) {
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

      @media ${device.mobileL} {
        max-width: 446px;
        width: 100%;
      }

      label {
        width: 100%;
        @media ${device.mobileL} {
          align-self: flex-start;
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
        width: 100%;
      }

      p {
        text-align: center;

        a {
          color: ${(props) => props.theme.colors.secondary};
        }
      }

      button {
        max-width: 80px;
      }
    }
  }

  h1,
  p,
  label {
    color: ${(props) => props.theme.colors.whiteText};
  }
`;
