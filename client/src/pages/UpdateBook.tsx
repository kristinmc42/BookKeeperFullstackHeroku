import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

// style sheet for react-day-picker imported in App.tsx

// components
import DisplayBook from "../components/DisplayBook";

//hooks
import useUserId from "../hooks/useUserId";
import useBooks from "../hooks/useBooks";

// types
import { BookInfo } from "../types";


const UpdateBook: React.FC = () => {
  const navigate = useNavigate();

  // get book info from location and extract and save bookInfo object and bookId string in variables
  const { state } = useLocation(); // bookInfo
  const bookInfo: BookInfo = state.bookInfo;
  const bookId = bookInfo.id;

  // get userid of current user
  const { data: user } = useUserId();
  const userId = user?.id;

  // get all books from the db for current user
  const  bookData = useBooks(userId);
  const allUsersBooks = bookData.data;
  console.log(allUsersBooks)
  
  // for the bookshelf category selected by the user
  const [bookshelf, setBookshelf] = useState<string | undefined>();

  // for the day selected by user in DayPicker
  const [dateRead, setDateRead] = useState<Date>();

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
    const target = e.target as typeof e.target & {
      bookshelfOptions: { value: string };
    };
    const status = target.bookshelfOptions.value;

    console.log(status); // status of bookshelf (read;currentlyReading;toRead)

    // check if this book (bookId) is in the allUsersBooks 
    // if no, add the book to the db
    // if yes, update the status of the book info in the db
    
 
      
  };
  return (
    <>
      <div className="bookContainer">
        <button className="back" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <DisplayBook item={bookInfo} format={"short"} />
      </div>
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
                footer={dateRead ?<p>You picked {format(dateRead, "PP")}.</p> :<p>Select the date you finished reading.</p>}
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
        {/* {isError && <h2>Error: {errorMessage}</h2> } */}
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default UpdateBook;
