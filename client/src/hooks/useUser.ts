import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// types
import { ContextState } from "../types";

export default function useUser(): ContextState | null {
  // get username and logout function from AuthContext
  const userContext: ContextState | null = useContext(AuthContext);

  if (!userContext) return null;

  return userContext;
}
