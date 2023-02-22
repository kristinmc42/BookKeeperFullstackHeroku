// import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Axios } from "../config";

// interfaces
import { ContextState, UserObj } from "../types";

// saves the current user in state and session storage, with login and logout functions, and isLoggedin boolean

export const AuthContext = createContext<ContextState | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

  const [currentUser, setCurrentUser] = useState<string | undefined>();

  // check session storage for user and save in state if there is one
  useEffect(() => {
    try {
      const savedUser: string | null = sessionStorage.getItem("alias");

      if (
        savedUser &&
        savedUser.valueOf() !== "null" &&
        savedUser.valueOf() !== "undefined"
      ) {
        const parsedUser: string = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const login = async (inputs: UserObj) => {
    return Axios.post(`/api/auth/login`, inputs).then((res) => {
      if (res.data !== undefined) {
        setCurrentUser(res.data);
        return res.data;
      }
      // errors will be handled in a catch in the Login page where this function is called
    });
  };
  // axios responses are parsed as JSON objects so don't need to parse them

  // could put in .then() instead of of await
  // use optional chaining to make sure each proprty exists; use default value ??
  // handle all cases such as not getting remote network and not valid

  // look into msw (use fetch not axios with it); isometricfetch or unfetch

  const logout = async () => {
    setCurrentUser(undefined);
    localStorage.clear();
    sessionStorage.clear();
    await Axios.post(`/api/auth/logout`);
  };

  const isLoggedIn = () => {
    if (!currentUser) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    sessionStorage.setItem("alias", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

