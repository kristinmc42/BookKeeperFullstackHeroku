// import React from 'react';
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import axios from 'axios';

// types
import { BookInfo } from '../types';

// hook uses React query to retrieve book info from Google Books API by a specific bookId

export default function useBookSearch(bookId:string | undefined): UseQueryResult<any, unknown> {
  const queryClient = useQueryClient();

  const getBookById =  async () => {
      return  axios
        .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
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
        const bookCache = queryClient.getQueryData("googleBooks") as BookInfo[] | undefined;
        
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
