import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useUserId() {
  // get username from AuthContext
  const userContext = useContext(AuthContext);

  if (!userContext) return null;

  const { currentUserId } = userContext;

  return currentUserId;
}
