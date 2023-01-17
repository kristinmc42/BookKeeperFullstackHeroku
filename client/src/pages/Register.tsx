import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Button from "../components/Button";

// interfaces
import { UserObj } from "../types";

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
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usernameRegister">Username:</label>
        <input
          required
          type="text"
          id="usernameRegister"
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="emailRegister"
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type={isShown ? "text" : "password"}
          id="passwordRegister"
          name="password"
          onChange={handleChange}
        />
        <label htmlFor="showPassword">Show password?</label>
        <input
          type="checkbox"
          id="showPassword"
          name="showPassword"
          checked={isShown}
          onChange={() => setIsShown((isShown) => !isShown)}
        />
        <Button type="submit">Register</Button>
        {error ? <p className="error">{error}</p> : null}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
