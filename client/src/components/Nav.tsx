import React, { useContext } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

//interfaces
import { ContextState } from "../types";

const Nav: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const userContext: ContextState | null = useContext(AuthContext);

  if (!userContext) return null;
  // deconstructs the currentUser and logout function from the AuthContext
  const { currentUser, logout } = userContext;

  const handleLogout = () => {
    // logs out user(clears cookie) and navigates back to home page
    logout();
    navigate("/");
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">Book Keeper</Link>
      </div>
      <ul className="links">
        <Link to="books">My Books</Link>
        <Link to="add">Add Book</Link>
        <span>{currentUser?.username}</span>
        {currentUser ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
