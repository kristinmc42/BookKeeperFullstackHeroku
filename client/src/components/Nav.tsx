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

//types
import { ContextState } from "../types";

// styled components
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 10px 30px;

  @media (max-width: 902px) {
    padding-left: 15px;
  }
  @media (max-width: 380px) {
    padding-left: 8px;
  }

  ul {
    display: flex;

    @media (max-width: 586px) {
      padding-right: 10px;
    }
    li {
      padding: 10px 30px;

      @media (max-width: 902px) {
        padding: 10px 15px;
      }
      @media (max-width: 380px) {
        padding: 8px;
      }
    }
    li:nth-child(-n + 2) {
      @media (min-width: 617px) {
        display: none;
      }
    }
    li:nth-child(3),
    li:nth-child(4) {
      @media (max-width: 616px) {
        display: none;
      }
    }
    li:nth-child(5) {
      display:flex;
      
      p {
        color: ${(props) => props.theme.colors.secondary};
        padding-right: 30px;

        @media (max-width: 496px) {
          display: none;
        }
      }
      button{
        margin-top:-6px;
      }

    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.whiteText};
  font-family: ${(props) => props.theme.fonts.main};
  text-align: center;
  min-width: 149px;

  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  }

  @media (max-width: 702px) {
    min-width: 0;
  }
`;
const StyledLogoLink = styled(StyledNavLink)`
  font-family: ${(props) => props.theme.fonts.header};
  text-align: left;
  padding: 10px 30px;
  min-width: 75px;

  @media (max-width: 902px) {
    padding: 10px;
  }
`;

const StyledMobileLink = styled(StyledNavLink)``;

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
      <StyledLogoLink to="/" title="home page">
        Book Keeper
      </StyledLogoLink>

      <ul>
        <li key={1}>
          <StyledMobileLink to="books" title="my books">
            {<FontAwesomeIcon icon={faBookOpen} />}
          </StyledMobileLink>
        </li>
        <li key={2}>
          <StyledMobileLink to="search" title="find new book">
            {<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}
          </StyledMobileLink>
        </li>
        <li key={3}>
          <StyledNavLink to="books">My Books</StyledNavLink>
        </li>
        <li key={4}>
          <StyledNavLink to="search">Find New Book</StyledNavLink>
        </li>
        {currentUser ? (
          <>
            <li key={5}>
              <p>{currentUser?.username}</p>
              <Button onClick={handleLogout}>Logout</Button>
            </li>
          </>
        ) : (
          <li key={6}>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </li>
        )}
      </ul>
    </StyledNav>
  );
};

export default Nav;
