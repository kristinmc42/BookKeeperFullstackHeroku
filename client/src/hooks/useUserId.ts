import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { ContextState } from "../types";

export default function useUserId() {
  // get username from AuthContext
  let username: string | undefined;
  const userContext: ContextState | null = useContext(AuthContext);
  if (userContext) {
    username = userContext.currentUser?.username;
  }

  // get userId from db based on username
  const getUser = async () => {
    return axios
      .get(`https://${process.env.REACT_APP_API_URL}/api/users/${username}`)
      .then((res) => {
        return res.data;
      });
  };

  return useQuery(["user", username], getUser, { enabled: !!username });
}
