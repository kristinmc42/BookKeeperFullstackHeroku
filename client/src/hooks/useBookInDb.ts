// import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

// hook gets book from db for current user with specific bookid
//  error if book not in db for the user will be caught in react query where hook is called

export default function useBookInDb(
  bookId: string | undefined,
  userId: number | undefined,
): UseQueryResult<any, unknown> {

  const getBookByUserId = async () => {
    return axios
      .get(`http://localhost:5000/api/books/${bookId}/users/${userId}`)
      .then((res) => {
        return res.data;
      });
  };

  return useQuery(["books", userId], getBookByUserId, {
    enabled: !!userId,
  });
}
