import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

// style sheet for react-day-picker imported in App.tsx

// components
import { DisplayGoogleBook } from "../components/DisplayBook";
import Button from "../components/Button";

//functions
import { convertBookToDbFormat } from "../functions/convertBookToDbFormat";
import { convertDateToString } from "../functions/convertDateToString";

//hooks
import useUserId from "../hooks/useUserId";
import useBookInDb from "../hooks/useBookInDb";

// types
import { BookInfo, DbBookInfo } from "../types";

// displays select info on the book and allows the user to choose a status(bookshelf) for the book and then add to db
const AddBook: React.FC = () => {
  const navigate = useNavigate();

  // get book info from location and save bookId string in variables
  const { state } = useLocation();
  const bookInfo: BookInfo = state.bookInfo; // bookInfo Object
  const bookId: string = bookInfo.id;

  // get userid of current user
  const { data: user } = useUserId();
  const userId: number = user?.id;

  //  check if book is in db
  const bookData = useBookInDb(bookId, userId, undefined);

  // for the bookshelf category selected by the user
  const [bookshelf, setBookshelf] = useState<string | undefined>();

  // for the day selected by user in DayPicker
  const [dateRead, setDateRead] = useState<Date | undefined>();

  // date as a string
  let dateReadString: string | undefined;

  // convert bookInfo from book passed to DB format
  const convertedBook: DbBookInfo | undefined = convertBookToDbFormat(
    bookInfo,
    bookshelf,
    dateReadString,
    userId
  );

  // to ADD the book to the db
  const addBook = (book: DbBookInfo | undefined) => {
    console.log(book);
    return axios.post(`http://localhost:5000/api/books/`, book);
  };
  const mutation = useMutation(addBook);

  // when radio button selection changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.checked) {
      setBookshelf(target.value);
    }
  };

  // when user clicks add button to save book details from form
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const bookToAdd = convertedBook;
    if (bookToAdd) {
      bookToAdd.userid = userId;
      bookToAdd.status = bookshelf;
      if (dateRead) {
        dateReadString = convertDateToString(dateRead);
        bookToAdd.dateRead = dateReadString;
      }
    }

    console.log(bookToAdd);
    // add book to db
    mutation.mutate(bookToAdd);
  };

  return (
    <>
      <div className="bookContainer">
        <Button onClick={() => navigate(-1) } >Back</Button>
  
      

        <DisplayGoogleBook item={bookInfo} format={"short"} />
      </div>
      {bookData.isSuccess && bookData.data.length > 0 ? (
        <span className="message">
          You already have this book on your bookshelf!
        </span>
      ) : (
        <>
          {mutation.isSuccess ? (
            <span className="message">Book added!</span>
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
                    onChange={handleChange}
                  />
                  To Read
                </label>
              </fieldset>

              {mutation.isError ? null : (
                <Button disabled={!bookshelf}>Add Book </Button>
              )}
            </form>
          )}
        </>
      )}

      {/* loading/error messages */}
      {bookData.isError ? (
        <span className="message">
          An error occurred: {(bookData.error as Error).message}
        </span>
      ) : null}

      {mutation.isLoading ? (
        <span className="message">"Adding book to bookshelf..."</span>
      ) : (
        <>
          {mutation.isError &&
          (mutation.error as AxiosError).response?.status === 500 ? (
            <span className="message">
              Please login to add the book to your bookshelf.
            </span>
          ) : null}

          {mutation.isError &&
          (mutation.error as AxiosError).response?.status !== 500 ? (
            <span className="message">
              An error occurred: {(mutation.error as Error).message}
            </span>
          ) : null}
        </>
      )}
    </>
  );
};

export default AddBook;
