import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";

// interfaces
import { ContextState, UserObj } from "../types";

// saves the current user in state, with login and logout functions to save/remove user from local storage

export const AuthContext = createContext<ContextState | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("alias") as string) || null
  );
  const [currentUserId, setCurrentUserId] = useState(
    JSON.parse(localStorage.getItem("key") as string) || null
  );

  axios.defaults.withCredentials = true;

  const login = async (inputs: UserObj) => {
    // const res = await axios.post(
    //   `http://localhost:5000/api/auth/login`,
    //   inputs
    //   );
    const res = await axios.post(
      `https://${process.env.REACT_APP_API_URL}/api/auth/login`,
      inputs
    );

    setCurrentUser(res.data.username);
    setCurrentUserId(res.data.id);
    return res.data;
  };

  const logout = async () => {
    setCurrentUser(null);
    setCurrentUserId(null);
    localStorage.clear();
    sessionStorage.clear();
    // await axios.post(`http://localhost:5000/api/auth/logout`);
    await axios.post(
      `https://${process.env.REACT_APP_API_URL}/api/auth/logout`
    );
  };

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
