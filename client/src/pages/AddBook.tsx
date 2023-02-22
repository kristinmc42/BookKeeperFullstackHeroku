import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { Axios } from "../config";
import { useMutation, UseQueryResult } from "react-query";
import styled from "styled-components";

// components
import { DisplayGoogleBook } from "../components/DisplayBook";
import Button from "../components/Button";
import BookshelfOptionsFieldset from "../components/BookshelfOptionsFieldset";
import ErrorMessage from "../components/ErrorMessage";
import MessageCard from "../components/MessageCard";
import CardOverlay from "../components/CardOverlay";

//functions
import { convertBookToDbFormat } from "../functions/convertBookToDbFormat";
import { convertDateToString } from "../functions/convertDateToString";

//hooks
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import useBookInDb from "../hooks/useBookInDb";

// types
import { BookInfo, DbBookInfo } from "../types";

// displays select info on the book and allows the user to choose a status(bookshelf) for the book and then add to db
const AddBook: React.FC = () => {
  const navigate = useNavigate();

  // get book info from location and save bookId string in variables
  const { state } = useLocation();
  const bookInfo: BookInfo = state.bookInfo;
  const bookId: string = bookInfo.id;

  // check that user is logged in
  const isLoggedIn = useIsLoggedIn();

  //  check if book is in db
  const bookData: UseQueryResult<any, unknown> = useBookInDb(bookId, undefined);

  // for the bookshelf category selected by the user
  const [bookshelf, setBookshelf] = useState<string | undefined>();

  // for error messages
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // for the day selected by user in BookshelfOptionsFieldset
  const [dateRead, setDateRead] = useState<Date | undefined | null>();

  // date as a string
  let dateReadString: string | undefined;

  // convert bookInfo from book passed to DB format
  const convertedBook: DbBookInfo | undefined = convertBookToDbFormat(
    bookInfo,
    bookshelf,
    dateReadString
  );

  // to ADD the book to the db
  const addBook = async (book: DbBookInfo | undefined) => {
    return await Axios.post(
      `/api/books/`,
      book
    ).catch((err) => {
      const errorResponse: AxiosResponse<unknown, any> | undefined =
        err.response;
      const errorStatus: number | undefined = errorResponse?.status;
      let responseErrorMessage: string | undefined;
      if (typeof errorResponse?.data === "string") {
        responseErrorMessage = errorResponse?.data;
      }
      switch (errorStatus) {
        case 400:
        case 401:
          setErrorMessage(responseErrorMessage);
          break;
        case 404:
        case 500:
        default:
          setErrorMessage(
            "Oops! Something went wrong. Please refresh and try again."
          );
      }
    });
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
      bookToAdd.status = bookshelf;
      if (dateRead) {
        dateReadString = convertDateToString(dateRead);
        bookToAdd.dateRead = dateReadString;
      }
    }
    // add book to db
    mutation.mutate(bookToAdd);
  };

  console.log(mutation);
  return (
    <Wrapper>
      <>
        <Button onClick={() => navigate(-1)}>Back</Button>

        <DisplayGoogleBook item={bookInfo} format={"short"} />

        {bookData.isSuccess && bookData.data.length === 0 && isLoggedIn && (
          <StyledForm onSubmit={handleSubmit}>
            <BookshelfOptionsFieldset
              bookshelf={bookshelf}
              handleChange={handleChange}
              dateRead={dateRead}
              setDateRead={setDateRead}
            />
            <Button disabled={!bookshelf}>Add Book </Button>
          </StyledForm>
        )}
      </>

      {/* loading/error messages */}

      {((bookData.isSuccess && !isLoggedIn) || bookData.isLoading || mutation.isIdle) && (
        <StyledMessage>Checking...</StyledMessage>
      )}

      {bookData.isSuccess && bookData.data.length > 0 && isLoggedIn && (
        <ErrorMessage>
          You already have this book in your bookshelf.
        </ErrorMessage>
      )}

      {mutation.isLoading ? (
        <StyledMessage>Adding book to bookshelf...</StyledMessage>
      ) : (
        <>
          {mutation.isSuccess ? (
            <>
              <CardOverlay>
                <MessageCard navigateTo="/books">
                  <h2>Book added!</h2>
                </MessageCard>
              </CardOverlay>
            </>
          ) : (
            <>
              {((mutation.isError &&
                mutation.error instanceof AxiosError &&
                mutation.error.response?.status === 500) ||
                (bookData.isError && !isLoggedIn)) && (
                <ErrorMessage>
                  Please login to add the book to your bookshelf.
                </ErrorMessage>
              )}

              {mutation.isError &&
                mutation.error instanceof AxiosError &&
                mutation.error.response?.status !== 500 && (
                  <ErrorMessage>An error occurred: {errorMessage}</ErrorMessage>
                )}
            </>
          )}
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

  article {
    align-items: flex-start;
    border: 2px solid ${(props) => props.theme.colors.secondary};
    padding: 1.5em 0.5em 2em 0.5em;
  }
  section:first-child {
    max-width: none;
    div {
      padding-right: 1em;
    }
  }

  button {
    max-width: 75px;
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
  font-size: 1rem;
  padding-left: 0.5em;
  color: ${(props) => props.theme.colors.secondary};
`;
