import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

// style sheet for react-day-picker imported in App.tsx

// components
import { DisplayDbBook } from "../components/DisplayBook";
import Button from "../components/Button";

//functions
import { convertDateToString } from "../functions/convertDateToString";

//hooks
import useUserId from "../hooks/useUserId";
import useBookInDb from "../hooks/useBookInDb";

// types
import { DbBookInfo } from "../types";

// displays select info on the book and allows the user to modify the status of the book in the db
const UpdateBook: React.FC = () => {
  const navigate = useNavigate();

  // get book info from location and extract and save bookInfo object, selectedStatus, and bookId string in variables
  const { state } = useLocation();
  const bookInfo: DbBookInfo = state.bookInfo; // bookInfo Object
  const bookId: string = bookInfo.bookid;
  const selectedStatus: string = state.selectedStatus; // bookshelf status to change to

  // get userid of current user
  const { data: user } = useUserId();
  const userId: number = user?.id;

  //  get book from db that matches bookId
  const bookData = useBookInDb(bookId, userId, bookInfo);

  // for the bookshelf category selected by the user
  const [bookshelf, setBookshelf] = useState<string | undefined>(
    selectedStatus
  );

  // for the day selected by user in DayPicker
  const [dateRead, setDateRead] = useState<Date>();

  // to update the book info in the db
  const updateBook = (
    book: DbBookInfo | undefined,
    bookId: string | undefined,
    userId: number | undefined
  ) => {
    return axios.put(
      `http://localhost:5000/api/books/${bookId}/users/${userId}`,
      book
    );
  };
  const mutation = useMutation({
    mutationFn: ({
      book,
      bookId,
      userId,
    }: {
      book: DbBookInfo | undefined;
      bookId: string | undefined;
      userId: number | undefined;
    }) => updateBook(book, bookId, userId),
  });

  // when radio button selection changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.checked) {
      setBookshelf(target.value);
    }
  };

  // when user clicks save button to save book details from form
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bookInDb: DbBookInfo = bookData.data[0];
    if (dateRead) {
      bookInDb.dateRead = convertDateToString(dateRead);
    }
    bookInDb.status = bookshelf;

    mutation.mutate({ book: bookInDb, bookId, userId });
  };

  return (
    <>
      <div className="bookContainer">
        {mutation.isSuccess ? null : <Button onClick={() => navigate(-1)}>Back</Button>}
        <DisplayDbBook item={bookInfo} format={"short"} />
      </div>
      {mutation.isSuccess ? (
        <span className="message">Book updated!</span>
      ) : (
        <form className="optionsForm" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Select a bookshelf for this title</legend>
            <div className="readContainer">
              <label htmlFor="read">
                <input
                  type="radio"
                  name="bookshelfOptions"
                  id="read"
                  value="read"
                  checked={bookshelf === "read"} // if a selection was passed in props
                  onChange={handleChange}
                />
                Read
              </label>
              {bookshelf === "read" && (
                <DayPicker
                  mode="single"
                  selected={dateRead}
                  onSelect={setDateRead}
                  footer={
                    dateRead ? (
                      <p>You picked {format(dateRead, "PP")}.</p>
                    ) : (
                      <p>Select the date you finished reading.</p>
                    )
                  }
                />
              )}
            </div>
            <label htmlFor="currentlyReading">
              <input
                type="radio"
                name="bookshelfOptions"
                id="currentlyReading"
                value="currentlyReading"
                checked={bookshelf === "currentlyReading"}
                onChange={handleChange}
              />
              Currently Reading
            </label>
            <label htmlFor="toRead">
              <input
                type="radio"
                name="bookshelfOptions"
                id="toRead"
                value="toRead"
                checked={bookshelf === "toRead"}
                onChange={handleChange}
              />
              To Read
            </label>
          </fieldset>
          {bookData.isError && (
            <h2>Error: {(bookData.error as Error).message}</h2>
          )}

          <Button type="submit">Update</Button>
        </form>
      )}

      {mutation.isLoading ? (
        "Adding book to bookshelf..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {(mutation.error as Error).message}</div>
          ) : null}
        </>
      )}
    </>
  );
};

export default UpdateBook;
