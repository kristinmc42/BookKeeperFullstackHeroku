import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// components
import DisplayBook from "../components/DisplayBook";

// hooks
import useBook from "../hooks/useBook"

// types
type BookParams = {
  bookId: string
}

const SingleSearchBook: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<BookParams>();
  
  // use custom hook to retrieve book info from Google books API
  const { data, error, isError, isLoading, isFetching } = useBook(bookId, "googleBooks");

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