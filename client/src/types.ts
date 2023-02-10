import { AxiosResponse } from "axios";
import React from "react";

export interface UserObj {
  username?: string;
  email?: string;
  password?: string;
  alias?: string;
}

export interface ContextState {
  currentUser: string | null;
  currentUserId: number | undefined;
  login: (inputs: UserObj) => Promise<AxiosResponse<any, any>>;
  logout: () => void;
}

export interface ComponentProps {
  children: React.ReactNode;
}

export interface BookInfo {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    categories?: string[];
    imageLinks?: { smallThumbnail?: string };
    description?: string;
    pageCount?: number;
    previewLink?: string;
    language?: string;
    publishedDate?: string;
  };
}

export interface DbBookInfo {
  id?: number;
  title: string;
  subtitle?: string;
  author?: string;
  genre?: string;
  img?: string; // smallThumbnail url
  desc?: string;
  pageCount?: number;
  previewLink?: string;
  language?: string;
  publishedDate?: string;
  bookid: string;
  dateRead?: string;
  status?: string; // read/toRead/currentlyReading
  userid: number | undefined | null;
}
