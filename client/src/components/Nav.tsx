import React, { useContext } from "react";
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassPlus,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

// components
import Button from "./Button";

//interfaces
import { ContextState } from "../types";

// styled components
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
    padding-right: 30px;

    @media (max-width: 445px) {
      padding-right: 10px;
    }
  }
  p {
    color: ${(props) => props.theme.colors.secondary};
    padding: 10px 30px;
  }
`;

const StyledLogoLink = styled(NavLink)`
  font-family: ${(props) => props.theme.fonts.header};
  color: ${(props) => props.theme.colors.whiteText};
  padding: 10px 30px;
  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  }

  @media (max-width: 445px) {
    padding: 10px;
  }
`;

const StyledNavLink = styled(StyledLogoLink)`
  font-family: ${(props) => props.theme.fonts.main};

  @media (max-width: 703px) {
    display: none;
  }
`;

const StyledMobileLink = styled(StyledLogoLink)`
  @media (min-width: 703px) {
    display: none;
  }
`;



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
        <StyledMobileLink to="books">
          {<FontAwesomeIcon icon={faBookOpen} />}
        </StyledMobileLink>
        <StyledMobileLink to="search">
          {<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}
        </StyledMobileLink>
        <StyledNavLink to="books">My Books</StyledNavLink>
        <StyledNavLink to="search">Find New Book</StyledNavLink>
        {currentUser ? (
          <>
            <p>{currentUser?.username}</p>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </>
        )}
      </ul>
    </StyledNav>
  );
};

export default Nav;
