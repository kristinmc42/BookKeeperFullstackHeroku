import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

// hooks
import useConvertBookInfo from "../hooks/useConvertBookInfo";

//types
import { DbBookInfo, BookInfo } from "../types";

export default function AddBookToDb({convertedBook}: {convertedBook:DbBookInfo}) {
  // takes the book passed as param and adds it to the db with useMutation
  // returns mutation results

  const addBook = (convertedBook: DbBookInfo | undefined) => {
    return axios.post(`http://localhost:5000/api/books`, convertedBook);
  };

  const mutation = useMutation(addBook);

  return (
    <div>
      {mutation.isLoading ? (
        "Adding book to bookshelf..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {(mutation.error as Error).message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Book added!</div> : null}

            <button
              onClick={() => {
              mutation.mutate(convertedBook);
            }}
          >
            Add Book
          </button>
        </>
      )}
    </div>
  );
}
