import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

//components
import Button from "../components/Button";

// interfaces
import { UserObj } from "../types";

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
    <div className="auth">
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="usernameLogin">Username:</label>
        <input
          required
          type="text"
          id="usernameLogin"
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="passwordLogin">Password:</label>
        <input
          required
          type="password"
          id="passwordLogin"
          name="password"
          onChange={handleChange}
        />
        <Button type="submit">Login</Button>
        {error && <p className="error">{error}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
