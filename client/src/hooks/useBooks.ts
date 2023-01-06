import React from 'react';
import { useQuery, UseQueryResult } from "react-query";
import axios from 'axios';


export default function useBooks(userId: number | undefined): UseQueryResult<any, unknown> {
    // hook gets all books in the db for one user

  const getBookByUserId =  async () => {
      return  axios
        .get(`http://localhost:5000/api/books/${userId}`)
        .then((res) => {
          return res.data
        });
    };
    
  return useQuery(
    ["books", userId],
    getBookByUserId,
    {
      enabled: !!userId,
    }
  );
}
