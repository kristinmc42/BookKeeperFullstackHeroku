import React from 'react';
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import axios from 'axios';

// types
import { BookInfo } from '../types';

export default function useBook(bookId:string | undefined, api:string): UseQueryResult<any, unknown> {
  const queryClient = useQueryClient();

  let url: string;
  let queryKey: string;

  if (api === "googleBooks") {
    url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
    queryKey = "googleBooks";
  } else if (api = "api") {
    url = `http://localhost:5000/api/books/${bookId}`;
    queryKey = "api";
  }

  const getBookById =  async () => {
      return  axios
        .get(url)
        .then((res) => {
          console.log(res.data)
          return res.data
        });
    };
    
          
  return useQuery(
    ["book", bookId],
    () => getBookById(),
    {
      enabled: !!bookId,
      initialData: () => {
        const bookCache = queryClient.getQueryData(queryKey) as BookInfo[] | undefined;
        
        if (bookCache) {
          const book = bookCache.find((book: BookInfo) => book.id === bookId)

          if (book) {
            return { data: book }
          } else { return undefined }
        }
      }
    }
  );
}
