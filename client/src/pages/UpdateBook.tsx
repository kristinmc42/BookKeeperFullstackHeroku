import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

// style sheet for react-day-picker imported in App.tsx

// components
import DisplayBook from "../components/DisplayBook";

// types
// import { BookInfo } from "../types";
// interface LocationState {
//   bookInfo: BookInfo;
//   dateRead?: Date;
// }

const AddBook: React.FC = () => {
  const { state } = useLocation(); // bookInfo and (possibly) dateRead passed in state
  const navigate = useNavigate();

  const [bookshelf, setBookshelf] = useState<string | undefined>();

  // for day selected by user in DayPicker
  const [dateRead, setDateRead] = useState<Date>();
  let footer = <p>Date you finished reading.</p>;
  if (dateRead) {
    footer = <p>You picked {format(dateRead, "PP")}.</p>;
  }

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

    console.log(dateRead); // dateRead

    // update bookInfo in db or add book to db
  };
  return (
    <>
      <div className="bookContainer">
        <button className="back" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <DisplayBook item={state.bookInfo} format={"short"} />
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
                footer={footer}
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
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default AddBook;
