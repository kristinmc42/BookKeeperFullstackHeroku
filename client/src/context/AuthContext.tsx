import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
// import secureLocalStorage from "react-secure-storage";

// interfaces
import { ContextState, UserObj } from "../types";

// saves the current user in state, with login and logout functions to save/remove user from local storage

export const AuthContext = createContext<ContextState | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
  }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("alias") as string) || null);
    const [currentUserId, setCurrentUserId] = useState(JSON.parse(localStorage.getItem("key") as string) || null);
  
  
  // const [currentUser, setCurrentUser] = useState<string | null>(
  //   JSON.parse(sessionStorage.getItem("alias") as string) || null
  // );
  // const [currentUserId, setCurrentUserId] = useState<number | undefined>();


  axios.defaults.withCredentials = true;

    // const login = async (inputs: UserObj) => {
  //   const res = await axios.post(`https://${process.env.REACT_APP_API_URL}/api/auth/login`, inputs);
  //   setCurrentUser(res.data.username);
  // return res
  // };

  const login = async (inputs:UserObj) => {
    const res = await axios
      .post(`http://localhost:5000/api/auth/login`, inputs);
    console.log(res.data.id)
    setCurrentUser(res.data.username);
    setCurrentUserId(res.data.id);
    return res.data;
  }
  

  const logout = async () => {
    await axios.post(`http://localhost:5000/api/auth/logout`);
    setCurrentUser(null);
    setCurrentUserId(null);
    localStorage.clear();
    sessionStorage.clear();
  };
  // const logout = async () => {
  //   await axios.post(`https://${process.env.REACT_APP_API_URL}/api/auth/logout`);
  //   setCurrentUser(null);
  // };

  useEffect(() => {
   localStorage.setItem("alias", JSON.stringify(currentUser));
  localStorage.setItem("key", JSON.stringify(currentUserId));
  }, [currentUser, currentUserId]);

  return (
    <AuthContext.Provider value={{ currentUser, currentUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
