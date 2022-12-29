import React from "react";

export interface UserObj {
  username: string;
  email?: string;
  password: string;
}

export interface ContextState {
  currentUser: UserObj | null;
  login: (inputs: UserObj) => void;
  logout: () => void;
}

export interface ComponentProps {
  children: React.ReactNode;
}
