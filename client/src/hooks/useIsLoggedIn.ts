import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useIsLoggedIn() {
  // get username from AuthContext
  const userContext = useContext(AuthContext);

  if (!userContext) return null;

  const { isLoggedIn } = userContext;

  return isLoggedIn;
}
