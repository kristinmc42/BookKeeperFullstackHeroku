import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// components
import { DisplayGoogleBook } from "../components/DisplayBook";
import Button from "../components/Button";

// hooks
import useBookSearch from "../hooks/useBookSearch";

// types
type BookParams = {
  bookId: string;
};

// Displays more information on the book from Google books API that was selected by the user

const SingleSearchBook: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<BookParams>();

  // use custom hook to retrieve book info from Google books API
  const { data, error, isError, isLoading, isFetching } = useBookSearch(bookId);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    if (error instanceof Error) {
      return <h2>Error: {error.message}</h2>;
    }
  }

  data && console.log(data);

  return (
    <div className="pageContainer">
      <Button onClick={() => navigate(-1)}>Back</Button>
      <DisplayGoogleBook item={data} format={"full"} />
      <Button
        type="button"
        onClick={() => navigate("/add", { state: { bookInfo: data } })}
      >
        Add to my books
      </Button>
    </div>
  );
};

export default SingleSearchBook;
