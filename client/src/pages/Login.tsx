import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

//components
import Button from "../components/Button";

// types
import { UserObj } from "../types";

// styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 90%;
  margin: 0 auto;
  height: 100vh;

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 100%;
    max-width: 876px;
    margin: -100px auto;

    @media (max-width: 542px) {
      width: 100%;
    }

    h2 {
      margin-bottom: 75px;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 3em;

      @media (max-width: 1161px) {
        flex-direction: column;
        align-items: center;
        max-width: 366px;
      }

      input {
        margin-left: 10px;
        color: ${(props) => props.theme.colors.blackText};
        background-color: ${(props) => props.theme.colors.secondary};
        border: 3px solid ${(props) => props.theme.colors.secondary};

        @media (max-width: 405px) {
          display: block;
          margin-left: 0;
          margin-top: 8px;
        }
      }

      p {
        @media (max-width: 328px) {
          text-align: center;
        }
      }

      button {
        max-width: 80px;
      }
    }
  }

  h1,
  h2,
  p,
  label {
    color: ${(props) => props.theme.colors.whiteText};
  }
  a {
    color: ${(props) => props.theme.colors.secondary};
  }
  h1 {
    font-family: ${(props) => props.theme.fonts.header};
    @media (max-width: 330px) {
      font-size: 1.8em;
    }
  }
`;

const Login: React.FC = () => {
  // values from input fields inputted by user
  const [inputs, setInputs] = useState<UserObj>({
    username: "",
    password: "",
  });

  // error in axios call
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const userContext = useContext(AuthContext);

  if (!userContext) return null;
  //deconstructs login function from AuthContext
  const { login } = userContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sets state as user input changes in all fields
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    // makes axios post call when user clicks login button
    e.preventDefault();
    try {
      // if login successful, redirects user to bookshelf page
      await login(inputs);
      navigate("/books");
    } catch (err: unknown | any) {
      // sets error message in state
      setError(err.response.data);
    }
  };
  return (
    <Wrapper>
      <header>
        <Link to="/" title="home"> <h1>Book Keeper</h1></Link>
       
      </header>
      <main>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="usernameLogin">
            Username:
            <input
              required
              type="text"
              id="usernameLogin"
              name="username"
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
          {error && <p className="error">{error}</p>}
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </main>
    </Wrapper>
  );
};

export default Login;
