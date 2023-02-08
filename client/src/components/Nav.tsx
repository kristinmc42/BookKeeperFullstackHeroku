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

// styles
import { device } from "../styles/Breakpoints";

export default function Nav() {
  const navigate: NavigateFunction = useNavigate();

  // deconstructs the currentUser and logout function from the AuthContext
  const userContext: ContextState | null = useContext(AuthContext);
  if (!userContext) return null;
  const { currentUser, logout } = userContext;

  const handleLogout = () => {
    // logs out user(clears cookie), search info (session storage) and navigates back to home page
    logout();
    sessionStorage.clear();
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
            <FontAwesomeIcon icon={faBookOpen} />
            <span>My books</span>
          </StyledMobileLink>
        </li>
        <li key={2}>
          <StyledMobileLink to="search" title="add a new book">
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            <span>Add book</span>
          </StyledMobileLink>
        </li>
        <li key={3}>
          <StyledNavLink to="books">My Books</StyledNavLink>
        </li>
        <li key={4}>
          <StyledNavLink to="search">Add A Book</StyledNavLink>
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
}

// styled components
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;

  @media ${device.mobileM} {
    padding-left: 10px;
  }

  @media ${device.tablet} {
    padding: 10px 0 10px 30px;
  }

  ul {
    display: flex;
    padding-right: 10px;

    @media ${device.tablet} {
      padding-right: 30px;
    }
    li {
      padding: 8px;

      @media ${device.mobileM} {
        padding: 10px;
      }
      @media ${device.tablet} {
        padding: 10px 15px;
      }
      @media ${device.laptop} {
        padding: 10px 30px;
      }
    }
    li:nth-child(-n + 2) {
      height: 40px;
      width: 50px;

      @media (min-width: 585px) {
        display: none;
      }
    }
    li:nth-child(3),
    li:nth-child(4) {
      display: none;
      @media (min-width: 585px) {
        display: inline;
      }
    }
    li:nth-child(5) {
      display: flex;
      padding: 10px 0;

      @media ${device.tablet} {
        padding: 10px;
      }

      p {
        color: ${(props) => props.theme.colors.secondary};
        display: none;
        font-size: .8rem;
        padding-top: 8px;
        padding-right: 8px;

        @media (min-width: 585px) {
          display: inline;
          font-size: 1rem;
          padding-top: 3px;
        }
        @media ${device.tablet} {
          padding-right: 30px;
        }
      }
      button {
        height: 38px;
        font-size: 0.8rem;
        @media ${device.mobileL} {
        }
        @media ${device.tablet} {
          font-size: 1rem;
          margin-top: -3px;
        }
      }
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.whiteText};
  font-family: ${(props) => props.theme.fonts.main};
  text-align: center;
  line-height: 1.3;

  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  }

  @media ${device.tablet} {
    min-width: 149px;
  }
`;
const StyledLogoLink = styled(StyledNavLink)`
  font-family: ${(props) => props.theme.fonts.header};
  font-size: 1rem;
  text-align: left;
  padding: 10px;
  min-width: 75px;
  line-height: 1;

  @media ${device.mobileL} {
    font-size: 1.11rem;
  }
  @media ${device.tablet} {
    font-size: 1.4rem;
  }
  @media ${device.laptop} {
    padding: 10px 30px;
  }
`;
const StyledMobileLink = styled(StyledNavLink)`
  line-height: 0;
  display: flex;
  flex-direction: column;
  height: 40px;
  span {
    padding-top: 10px;
    font-size: 11px;
  }
`;
