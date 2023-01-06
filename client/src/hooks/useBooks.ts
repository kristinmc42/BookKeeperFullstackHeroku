import React from 'react';
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import axios from 'axios';

// types
import { BookInfo } from '../types';

export default function useBooks(userId: number | undefined): UseQueryResult<any, unknown> {
    // hook gets all books in the db for one user
//   const queryClient = useQueryClient();

  const getBookByUserId =  async () => {
      return  axios
        .get(`http://localhost:5000/api/books/${userId}`)
        .then((res) => {
          console.log(res.data)
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
