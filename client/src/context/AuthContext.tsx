import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";

// interfaces
import { ContextState } from "../types";

// saves the current user in state, with login and logout functions to save/remove user from local storage

export const AuthContext = createContext<ContextState | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
  }) => {

  
  const [currentUser, setCurrentUser] = useState<string | null>(
    JSON.parse(sessionStorage.getItem("alias") as string) || null
  );

  console.log(currentUser)
  axios.defaults.withCredentials = true;

  // const Login = useMutation(inputs: UserObj) => {
  //     return axios.post(`http://localhost:5000/api/auth/login`, inputs).then((res) => {
  //       setCurrentUser(res.data.username);
  //       return res.data;
  //     })
  //   }

  const login = async (alias:string) => {
    setCurrentUser(alias);
  }
  

  const logout = async () => {
    await axios.post(`http://localhost:5000/api/auth/logout`);
    setCurrentUser(null);
  };
  // const logout = async () => {
  //   await axios.post(`https://${process.env.REACT_APP_API_URL}/api/auth/logout`);
  //   setCurrentUser(null);
  // };

  useEffect(() => {
    sessionStorage.setItem("alias", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
