import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

// style sheet for react-day-picker imported in App.tsx

// components
import { DisplayGoogleBook } from "../components/DisplayBook";
import Button from "../components/Button";
import BookshelfOptionsFieldset from "../components/BookshelfOptionsFieldset";
import ErrorMessage from "../components/ErrorMessage";

//functions
import { convertBookToDbFormat } from "../functions/convertBookToDbFormat";
import { convertDateToString } from "../functions/convertDateToString";

//hooks
import useUserId from "../hooks/useUserId";
import useBookInDb from "../hooks/useBookInDb";

// types
import { BookInfo, DbBookInfo } from "../types";
import styled from "styled-components";
import { device } from "../styles/Breakpoints";

// displays select info on the book and allows the user to choose a status(bookshelf) for the book and then add to db
const AddBook: React.FC = () => {
  const navigate = useNavigate();

  // get book info from location and save bookId string in variables
  const { state } = useLocation();
  const bookInfo: BookInfo = state.bookInfo;
  const bookId: string = bookInfo.id;

  // get userid of current user
  const { data: user } = useUserId();
  const userId: number = user?.id;

  //  check if book is in db
  const bookData = useBookInDb(bookId, userId, undefined);

  // for the bookshelf category selected by the user
  const [bookshelf, setBookshelf] = useState<string | undefined>();

  // for the day selected by user in DayPicker
  const [dateRead, setDateRead] = useState<Date | undefined | null>();

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
    return axios.post(`https://${process.env.REACT_APP_API_URL}/api/books/`, book);
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
    <Wrapper>
      <div>
        <Button onClick={() => navigate(-1)}>Back</Button>

        <DisplayGoogleBook item={bookInfo} format={"short"} />
      </div>

      {bookData.isSuccess && bookData.data.length > 0 ? (
        <StyledMessage className="message">
          You already have this book on your bookshelf!
        </StyledMessage>
      ) : (
        <>
          {mutation.isSuccess ? (
            <StyledMessage className="message">Book added!</StyledMessage>
          ) : (
            <StyledForm onSubmit={handleSubmit}>
              <BookshelfOptionsFieldset
                bookshelf={bookshelf}
                handleChange={handleChange}
                dateRead={dateRead}
                setDateRead={setDateRead}
              />

              {mutation.isError ? null : (
                <Button disabled={!bookshelf}>Add Book </Button>
              )}
            </StyledForm>
          )}
        </>
      )}

      {/* loading/error messages */}
      {bookData.isError && (
        <ErrorMessage>
          An error occurred: {(bookData.error as Error).message}
        </ErrorMessage>
      )}

      {mutation.isLoading ? (
        <StyledMessage>"Adding book to bookshelf..."</StyledMessage>
      ) : (
        <>
          {mutation.isError &&
          (mutation.error as AxiosError).response?.status === 500 ? (
            <ErrorMessage>
              Please login to add the book to your bookshelf.
            </ErrorMessage>
          ) : null}

          {mutation.isError &&
          (mutation.error as AxiosError).response?.status !== 500 ? (
            <ErrorMessage>
              An error occurred: {(mutation.error as Error).message}
            </ErrorMessage>
          ) : null}
        </>
      )}
    </Wrapper>
  );
};

export default AddBook;

// styled components
const Wrapper = styled.div`
max-width: 1200px;
width: 89%;
min-height: 85vh;
margin: 0 auto;
display: flex;
flex-direction: column;
justify-content: space-around;

article{
  border: 2px solid ${(props) => props.theme.colors.secondary};
}

  button{
    margin-bottom: 1.5em;
  }
`;
const StyledForm = styled.form`
  button {
    max-width: 200px;
    margin-top: 0;
  }
`;
const StyledMessage = styled.h2`
  text-align: center;
  font-size: 1.8rem;

  @media ${device.tablet} {
    font-size: 2.2rem;
  }
`;
