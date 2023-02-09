import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

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
  const bookData = useBookInDb(bookId, undefined);

  // for the bookshelf category selected by the user
  const [bookshelf, setBookshelf] = useState<string | undefined>();

  // for the day selected by user in BookshelfOptionsFieldset
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
    return axios.post(
      `http://localhost:5000/api/books/`,
      // `https://${process.env.REACT_APP_API_URL}/api/books/`,
      book
    );
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
    // add book to db
    mutation.mutate(bookToAdd);
  };

  return (
    <Wrapper>
      <>
        <Button onClick={() => navigate(-1)}>Back</Button>

        <DisplayGoogleBook item={bookInfo} format={"short"} />
        {bookData.isSuccess && bookData.data.length === 0 && userId && (
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
      {userId && bookData.isSuccess && bookData.data.length > 0 && (
        <ErrorMessage>
          You already have this book in your bookshelf.
        </ErrorMessage>
      )}

      {bookData.isError && (
        <ErrorMessage>
          An error occurred: {(bookData.error as Error).message}
        </ErrorMessage>
      )}

      {mutation.isLoading ? (
        <StyledMessage>"Adding book to bookshelf..."</StyledMessage>
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
                (mutation.error as AxiosError).response?.status === 500) ||
                !userId) && (
                <ErrorMessage>
                  Please login to add the book to your bookshelf.
                </ErrorMessage>
              )}

              {mutation.isError &&
                (mutation.error as AxiosError).response?.status !== 500 && (
                  <ErrorMessage>
                    An error occurred: {(mutation.error as Error).message}
                  </ErrorMessage>
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
  font-size: 1.3rem;
  padding-left: 0.5em;

  @media ${device.tablet} {
    font-size: 1.7rem;
  }
`;
