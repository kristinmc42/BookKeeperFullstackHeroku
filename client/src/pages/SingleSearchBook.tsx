import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// components
import { DisplayGoogleBook } from "../components/DisplayBook";

// hooks
import useBook from "../hooks/useBook"

// types
type BookParams = {
  bookId: string
}

// Displays more information on the book from Google books API that was selected by the user
// gets current info on book with useQuery through the custim useBook hook
// if user clicks button to add to their bookshelf, they are navigated to the update page and the book info is passed in state
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

  return (
      <div className='pageContainer'>
      <button className="back" type="button" onClick={() => navigate(-1)}>Back</button>
      <DisplayGoogleBook item={data} format={"full"} />
      <button type="button" onClick={() => navigate("/update", {state: { bookInfo: data, source:"googleBooks"}})}>Add to my books</button>
    </div>
  )
}

export default SingleSearchBook;