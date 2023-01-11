import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

// style sheet for react-day-picker imported in App.tsx

// components
import { DisplayDbBook, DisplayGoogleBook } from "../components/DisplayBook";

//hooks
import useUserId from "../hooks/useUserId";
import useBook from "../hooks/useBookSearch";

// types
import { BookInfo, DbBookInfo } from "../types";
import useConvertBookInfo from "../hooks/useConvertBookInfo";
import axios from "axios";
import { useMutation } from "react-query";
import useBookInDb from "../hooks/useBookInDb";

// 🚨 NEED TO REDO THIS ENTIRE COMPONENT SO THAT IT IS ONLY BEING USED WHEN NAVIGATING FROM GOOGLE BOOKS
// MUTATION WILL BE A POST REQUEST TO DB

// displays select info on the book and allows the user to choose a status(bookshelf) for the book and then add to db 
const AddBook: React.FC = () => {
  const navigate = useNavigate();

  // get book info from location and extract and save bookInfo object, source, selectedStatus, and bookId string in variables
  const { state } = useLocation();
  const bookInfo = state.bookInfo; // bookInfo Object
  const bookId: string = bookInfo.id;
//   const selectedStatus = state.selectedStatus; // bookshelf status to change to

  const [convertedBook, setConvertedBook] = useState<DbBookInfo | undefined>();

//   const [updatedBook, setUpdatedBook] = useState<DbBookInfo | undefined>();

  // get userid of current user
  const { data: user } = useUserId();
  const userId: number = user?.id;
  userId && console.log(userId)

  //  check if book is in db 
  const bookData = useBookInDb(bookId, userId);
    const bookInDb = bookData.data;
    // 🚨 if book in db show message to user 
    bookInDb && console.log(bookInDb)
    
  // for the bookshelf category selected by the user
  const [bookshelf, setBookshelf] = useState<string | undefined>();

  // for the day selected by user in DayPicker
  const [dateRead, setDateRead] = useState<Date>();

      // 🚨 MOVE TO INSIDE HANDLE SUBMIT BEFORE MUTATE??
  // convert the book to db format
//   const returnedBook = useConvertBookInfo({
//     bookInfo,
//     dateRead,
//     bookshelf,
//     userId,
//   });

    // returnedBook && console.log(returnedBook)
    

  // to ADD the book to the db
  const addBook = (book: DbBookInfo | undefined) => {
    console.log(book)
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

  // when user clicks save button to save book details from form
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const target = e.target as typeof e.target & {
    //   bookshelfOptions: { value: string };
    // };
 
      // convert book to db format
      const convertedBook = useConvertBookInfo({
        bookInfo,
        dateRead,
        bookshelf,
        userId,
      });

    console.log(convertedBook)
  // add book to db
      mutation.mutate(convertedBook);
   
  };

  return (
    <>
      <div className="bookContainer">
        <button className="back" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      
        <DisplayGoogleBook item={bookInfo} format={"short"} />
       
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
                // checked={selectedStatus && selectedStatus === "read"} // if a selection was passed in props
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
            //   checked={selectedStatus && selectedStatus === "currentlyReading"}
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
            //   checked={selectedStatus && selectedStatus === "toRead"}
              onChange={handleChange}
            />
            To Read
          </label>
        </fieldset>
        {/* {isError && <h2>Error: {errorMessage}</h2> } */}

        <button>Add Book </button>
      </form>

      {/* if book not in db, add button with useMutations will be shown */}
      {/* {infoSource === "googleBooks" && bookData.isError && convertedBook ? (
        <div> */}
           
          {mutation.isLoading ? (
            "Adding book to bookshelf..."
          ) : (
            <>
              {mutation.isError ? (
                <div>
                  An error occurred: {(mutation.error as Error).message}
                </div>
              ) : null}

              {mutation.isSuccess ? <div>Book added!</div> : null}

            
            </>
          )}
        {/* </div>
      ) : null} */}
    </>
  );
};

export default AddBook;
