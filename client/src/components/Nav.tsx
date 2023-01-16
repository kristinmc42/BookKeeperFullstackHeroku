import React, { useContext } from "react";
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

//interfaces
import { ContextState } from "../types";

// styled components
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
    padding-right: 30px;
  }
  p {
    color: ${(props) => props.theme.colors.secondary};
    padding: 10px 30px;
  }
`;
const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.whiteText};
  padding: 10px 30px;
  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  }
`;
const StyledLogoLink = styled(StyledNavLink)`
  font-family: ${(props) => props.theme.fonts.header};
`;

const StyledButton = styled.button``;

const Nav: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  // deconstructs the currentUser and logout function from the AuthContext
  const userContext: ContextState | null = useContext(AuthContext);
  if (!userContext) return null;
  const { currentUser, logout } = userContext;

  const handleLogout = () => {
    // logs out user(clears cookie), search info (local storage) and navigates back to home page
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <StyledNav>
      <StyledLogoLink to="/">Book Keeper</StyledLogoLink>

      <ul>
        <StyledNavLink to="books">My Books</StyledNavLink>
        <StyledNavLink to="search">Find New Book</StyledNavLink>
        {currentUser ? (
          <>
            <p>{currentUser?.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <StyledNavLink to="/login">Login</StyledNavLink>
        )}
      </ul>
    </StyledNav>
  );
};

export default Nav;
