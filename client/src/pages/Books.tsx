import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target;
  //   if (target.checked) {
  //     setDisplayFilter(target.value);
  //   }
  // };

  return (
    <div className="pageContainer">
      {userId ? null : (
        <>
          <h2>Login to see your bookshelves</h2>
        </>
      )}
      {allBooks && allBooks.data ? (
        <>
          <BookshelfFilter displayFilter={displayFilter} setDisplayFilter = {setDisplayFilter} />
          <ul className="books">
            {allBooks.data.length > 0 ? (
              displayFilter === "all" ? (
                <>
                  {allBooks.data.map((book: DbBookInfo, index: number) => {
                    return (
                      <li key={`${book.bookid}${index}`}>
                        <Link to={`${book.bookid}`} state={{ book: book }}>
                          <DisplayDbBook item={book} format={"short"} />
                        </Link>
                      </li>
                    );
                  })}
                </>
              ) : displayFilter === "read" ? (
                <>
                  {allBooks.data.map((book: DbBookInfo, index: number) => {
                    if (book.status === "read") {
                      return (
                        <li key={`${book.bookid}${index}`}>
                          <Link to={`${book.bookid}`} state={{ book: book }}>
                            <DisplayDbBook item={book} format={"short"} />
                          </Link>
                        </li>
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
                        <li key={`${book.bookid}${index}`}>
                          <Link to={`${book.bookid}`} state={{ book: book }}>
                            <DisplayDbBook item={book} format={"short"} />
                          </Link>
                        </li>
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
                        <li key={`${book.bookid}${index}`}>
                          <Link to={`${book.bookid}`} state={{ book: book }}>
                            <DisplayDbBook item={book} format={"short"} />
                          </Link>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </>
              ) : null
            ) : null}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default Books;
