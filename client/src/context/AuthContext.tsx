// import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Axios } from "../config";

// interfaces
import { ContextState, UserObj } from "../types";

// saves the current user in state, with login and logout functions to save/remove user from local storage

export const AuthContext = createContext<ContextState | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

  // the username of the current user
  const [currentUser, setCurrentUser] = useState<string | undefined>();
  // tracks if user is logged in 
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  // check local storage for user and save in state if there is one
  useEffect(() => {
    try {
      const savedUser: string | null = localStorage.getItem("alias");
     
      if (savedUser &&  savedUser.valueOf() !== "null" && savedUser.valueOf() !== "undefined") {
        const parsedUser: string = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsSignedIn(true);
      }
    } catch (err) {
      console.error(err)
    }

  }, [])



    const login =  async (inputs: UserObj) => {

      return Axios.post(
        `/api/auth/login`, inputs
      ).then(res => {
        console.log(res, res.data)
        if (res.data !== undefined) {
          setCurrentUser(res.data.username);
          // setCurrentUserId(res.data.id);
          return res.data;
        } 
        // errors will be handled in a catch in the Login page where this function is called
      });
    };
    // axios responses are parsed as JSON objects so don't need to parse them
// could put in .then() instead of of await
    // use optional chaining to make sure each proprty exists; use default value ??
    // handle all cases such as not getting remote network and not valid

    //  use .catch
    // look into msw (use fetch not axios with it); isometricfetch or unfetch
    // setCurrentUser(res.data.username);
    // setCurrentUserId(res.data.id);
    // return res.data;

  const logout = async () => {
    setCurrentUser(undefined);
    // setCurrentUserId(null);
    localStorage.clear();
    sessionStorage.clear();

    await Axios.post(`/api/auth/logout`);
  };

  const isLoggedIn = () => {
    if (!currentUser) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    localStorage.setItem("alias", JSON.stringify(currentUser));
    // localStorage.setItem("key", JSON.stringify(currentUserId));
  // }, [currentUser, currentUserId]);
}, [currentUser]);

  return (
    // <AuthContext.Provider value={{ currentUser, currentUserId, login, logout }}>
    <AuthContext.Provider value={{ currentUser, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// create an async funtion that returns boolean if someone is logged in or not