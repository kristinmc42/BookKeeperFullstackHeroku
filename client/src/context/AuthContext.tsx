import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";

// interfaces
import { ContextState, UserObj, ComponentProps } from "../types";

// saves the current user in state, with login and logout functions to save/remove user from local storage

export const AuthContext = createContext<ContextState | null>(null);

export const AuthContextProvider: React.FC<ComponentProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<UserObj | null>(
    JSON.parse(localStorage.getItem("user") as string) || null
  );

  const login = async (inputs: UserObj) => {
    const res = await axios.post(`https://${process.env.REACT_APP_API_URL}/api/auth/login`, inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`https://${process.env.REACT_APP_API_URL}/api/auth/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
