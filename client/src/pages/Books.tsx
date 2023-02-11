import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseQueryResult } from "react-query";
import styled from "styled-components";
import { AxiosError } from "axios";

//components
import { DisplayDbBook } from "../components/DisplayBook";
import BookshelfFilter from "../components/BookshelfFilter";
import ErrorMessage from "../components/ErrorMessage";

// hooks
import useUserId from "../hooks/useUserId";
import useAllBooksInDb from "../hooks/useAllBooksInDb";

// types
import { DbBookInfo } from "../types";

//styles
import { device } from "../styles/Breakpoints";

// gets all users book from db and displays them
// user can filter books displayed by bookshelf(status)
const Books: React.FC = () => {
  const [displayFilter, setDisplayFilter] = useState<string>("all");

  // get userid of current user
  const currentUserId: number | null | undefined = Number(useUserId());

  // get all books from db for user
  const allBooks: UseQueryResult<any, unknown> = useAllBooksInDb();

  return (
    <Wrapper>
      <h1>My Books</h1>
      {allBooks.isLoading && <StyledMessage>Loading...</StyledMessage>}

      {((allBooks.error instanceof AxiosError &&
        allBooks.error.response?.status === 401) ||
        !currentUserId) && (
        <ErrorMessage>Please login to see your bookshelves</ErrorMessage>
      )}

      {allBooks.error instanceof AxiosError &&
        allBooks.error.response?.status !== 401 && (
          <ErrorMessage>
            Error: {(allBooks.error as Error).message}
          </ErrorMessage>
        )}

      {allBooks.isSuccess && allBooks.data ? (
        <>
          <BookshelfFilter
            displayFilter={displayFilter}
            setDisplayFilter={setDisplayFilter}
          />
          <BookList>
            {allBooks.data.length > 0 ? (
              displayFilter === "all" ? (
                <>
                  {[...allBooks.data]
                    .reverse()
                    .map((book: DbBookInfo, index: number) => {
                      return (
                        <ListItem
                          key={`${book.bookid}${index}`}
                          title="book details"
                        >
                          <DisplayDbBook item={book} format={"short"} />
                          <Link to={`${book.bookid}`} state={{ book: book }}>
                            More Info
                          </Link>
                        </ListItem>
                      );
                    })}
                </>
              ) : displayFilter === "read" ? (
                <>
                  {[...allBooks.data]
                    .reverse()
                    .map((book: DbBookInfo, index: number) => {
                      if (book.status === "read") {
                        return (
                          <ListItem key={`${book.bookid}${index}`}>
                            <DisplayDbBook item={book} format={"short"} />
                            <Link
                              to={`${book.bookid}`}
                              state={{ book: book }}
                              title="book details"
                            >
                              More Info
                            </Link>
                          </ListItem>
                        );
                      } else {
                        return null;
                      }
                    })}
                </>
              ) : displayFilter === "currentlyReading" ? (
                <>
                  {[...allBooks.data]
                    .reverse()
                    .map((book: DbBookInfo, index: number) => {
                      if (book.status === "currentlyReading") {
                        return (
                          <ListItem key={`${book.bookid}${index}`}>
                            <DisplayDbBook item={book} format={"short"} />
                            <Link
                              to={`${book.bookid}`}
                              state={{ book: book }}
                              title="book details"
                            >
                              {" "}
                              More Info
                            </Link>
                          </ListItem>
                        );
                      } else {
                        return null;
                      }
                    })}
                </>
              ) : displayFilter === "toRead" ? (
                <>
                  {[...allBooks.data]
                    .reverse()
                    .map((book: DbBookInfo, index: number) => {
                      if (book.status === "toRead") {
                        return (
                          <ListItem key={`${book.bookid}${index}`}>
                            <DisplayDbBook item={book} format={"short"} />
                            <Link
                              to={`${book.bookid}`}
                              state={{ book: book }}
                              title="book details"
                            >
                              More Info
                            </Link>
                          </ListItem>
                        );
                      } else {
                        return null;
                      }
                    })}
                </>
              ) : null
            ) : null}
          </BookList>
        </>
      ) : null}
    </Wrapper>
  );
};

export default Books;

// styled components
const Wrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    padding: 0.5em;

    @media ${device.tablet} {
      padding-left: 1em;
    }
    @media ${device.laptop} {
      padding-left: 1.5em;
    }
  }

  h1 + h2 {
    margin-top: 3em;
  }

  a {
    color: ${(props) => props.theme.colors.secondary};
    padding-left: 1em;
  }
`;

const ListItem = styled.li`
  width: 300px;
  margin: 20px auto;
  height: 100%;
  border: 2px solid ${(props) => props.theme.colors.secondary};

  h2 {
    padding-left: 0;
  }
`;

const BookList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-template-rows: repeat(1fr);
  align-items: stretch;
  gap: 0.5em;
  width: 96%;

  @media ${device.mobileM} {
    padding: 0.5em;
  }
`;
const StyledMessage = styled.h2`
  text-align: center;
  font-size: 1rem;
  padding: 5em 0.5em;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.colors.secondary};

  @media ${device.tablet} {
    padding-left: 1em;
  }
  @media ${device.laptop} {
    padding-left: 2em;
  }
`;
