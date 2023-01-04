import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from "react-query";
import axios from 'axios';

// components
import DisplayBook from "../components/DisplayBook";

// types
import { BookInfo } from '../types';
type BookParams = {
  bookId: string
}
const SingleSearchBook: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<BookParams>();
  
  const queryClient = useQueryClient();

  const getBookById =  async (id: string | undefined) => {
    return  axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      )
      .then((res) => {
        console.log(res.data)
        return res.data
      });
  };

      
  const { data, error, isError, isLoading, isFetching } = useQuery(
    ["book", bookId],
    () => getBookById(bookId),
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

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    if (error instanceof Error) {
      return <h2>Error: {error.message }</h2>
    }
  }

  data && console.log(data)
  // data.id; data.volumeInfo.title; data.volumeInfo.subtitle; data.volumeInfo.authors; data.volumeInfo.categories; data.volumeInfo.imageLinks.smallThumbnail; data.volumeInfo.description; data.volumeInfo.pageCount; data.volumeInfo.previewLink;data.volumeInfo.language;data.volumeInfo.publishedDate;


  return (
      <div className='pageContainer'>
      <button className="back" type="button" onClick={() => navigate(-1)}>Back</button>
      <DisplayBook item={data} format={"full"} />
      <button type="button" onClick={() => navigate("/update", {state: { bookInfo: data}})}>Add to my books</button>
    </div>
  )
}

export default SingleSearchBook;