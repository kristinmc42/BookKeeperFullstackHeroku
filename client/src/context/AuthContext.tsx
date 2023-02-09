import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useQuery, QueryClient, useQueryClient, useMutation } from "react-query";

// interfaces
import { ContextState, UserObj, ComponentProps } from "../types";

// saves the current user in state, with login and logout functions to save/remove user from local storage

export const AuthContext = createContext<ContextState | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
  }) => {
  const queryClient = useQueryClient();
  
  const [currentUser, setCurrentUser] = useState<string | null>(
    JSON.parse(sessionStorage.getItem("alias") as string) || null
  );

  axios.defaults.withCredentials = true;

  // const Login = useMutation(inputs: UserObj) => {
  //     return axios.post(`http://localhost:5000/api/auth/login`, inputs).then((res) => {
  //       setCurrentUser(res.data.username);
  //       return res.data;
  //     })
  //   }
  
  
  const Login = (inputs: UserObj | undefined) => {

    const loginUser = async () => {
      return axios.post(`http://localhost:5000/api/auth/login`, inputs).then((res) => {
        setCurrentUser(res.data.username);
        return res.data;
      })
    }

    return useQuery(["login", inputs], loginUser, { enabled: !!inputs });
  }

  //   const res = await axios.post(`http://localhost:5000/api/auth/login`, inputs);
  //   setCurrentUser(res.data.username);
  //   return res;
  // };
  // const login = async (inputs: UserObj) => {
  //   const res = await axios.post(`https://${process.env.REACT_APP_API_URL}/api/auth/login`, inputs);
  //   setCurrentUser(res.data);
  // };

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
    <AuthContext.Provider value={{ currentUser, Login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
