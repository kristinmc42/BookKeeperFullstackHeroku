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

export interface BookInfo{
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
  }
}

export interface DbBookInfo{
  id: number; 
  title: string;
  subtitle?: string;
  author?: string;// need to serialize/unserialize string of authors
  genre?: string;// need to serialize/unserialize string of genres
  img?: string;//save smallThumbnail url here
  desc?: string;
  pageCount?: number;
  previewLink?: string;
  language?: string;
  publishedDate?: Date;
  bookid: string;
  dateRead?: Date;
  status: string;
  userid: number;
}