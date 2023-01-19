import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//components
import { DisplayDbBook } from "../components/DisplayBook";
import BookshelfFilter from "../components/BookshelfFilter";

// hooks
import useUserId from "../hooks/useUserId";
import useAllBooksInDb from "../hooks/useAllBooksInDb";

// types
import { DbBookInfo } from "../types";

// gets all users book from db and displays them
// user can filter books displayed by bookshelf(status)
const Books: React.FC = () => {
  // get userid of current user
  const { data: user } = useUserId();
  const userId: number = user?.id;

  const [displayFilter, setDisplayFilter] = useState<string>("all");

  // get all books from db for user
  const allBooks = useAllBooksInDb(userId);

  if (allBooks.isLoading) {
    return <span>Loading...</span>;
  }

  if (allBooks.isError) {
    return <span>Error: {(allBooks.error as Error).message}</span>;
  }

  return (
    <Wrapper>
      {userId ? null : (
        <>
          <h2>Login to see your bookshelves</h2>
        </>
      )}
      {allBooks && allBooks.data ? (
        <>
          <h1>My Books</h1>
          <BookshelfFilter
            displayFilter={displayFilter}
            setDisplayFilter={setDisplayFilter}
          />
          <BookList>
            {allBooks.data.length > 0 ? (
              displayFilter === "all" ? (
                <>
                  {allBooks.data.map((book: DbBookInfo, index: number) => {
                    return (
                      <ListItem
                        key={`${book.bookid}${index}`}
                        title="book details"
                      >
                        <Link to={`${book.bookid}`} state={{ book: book }}>
                          <DisplayDbBook item={book} format={"short"} />
                        </Link>
                      </ListItem>
                    );
                  })}
                </>
              ) : displayFilter === "read" ? (
                <>
                  {allBooks.data.map((book: DbBookInfo, index: number) => {
                    if (book.status === "read") {
                      return (
                        <ListItem key={`${book.bookid}${index}`}>
                          <Link
                            to={`${book.bookid}`}
                            state={{ book: book }}
                            title="book details"
                          >
                            <DisplayDbBook item={book} format={"short"} />
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
                  {allBooks.data.map((book: DbBookInfo, index: number) => {
                    if (book.status === "currentlyReading") {
                      return (
                        <ListItem key={`${book.bookid}${index}`}>
                          <Link
                            to={`${book.bookid}`}
                            state={{ book: book }}
                            title="book details"
                          >
                            <DisplayDbBook item={book} format={"short"} />
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
                  {allBooks.data.map((book: DbBookInfo, index: number) => {
                    if (book.status === "toRead") {
                      return (
                        <ListItem key={`${book.bookid}${index}`}>
                          <Link
                            to={`${book.bookid}`}
                            state={{ book: book }}
                            title="book details"
                          >
                            <DisplayDbBook item={book} format={"short"} />
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

  h1 {
    padding-left: 1em;
  }
`;

const ListItem = styled.li`
  width: 320px;
  margin: 20px auto;
  height: 100%;

  @media (orientation: landscape) and (hover: none) and (pointer: coarse) and (max-width: 1023px) {
  }
`;

const BookList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-template-rows: repeat(1fr);
  align-items: stretch;
  gap: 0.5em;
`;
