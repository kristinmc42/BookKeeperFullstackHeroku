import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";

//components
import Button from "../components/Button";
import { DisplayDbBook } from "../components/DisplayBook";

//types
import { DbBookInfo } from "../types";

export default function SingleDbBook() {
  const navigate = useNavigate();

  // get bookInfo passed in state
  const { state } = useLocation();
  const bookInfo: DbBookInfo = state.book;

  // get bookId and userId from bookInfo
  const bookId: string = bookInfo.bookid;
  const userId: number = bookInfo.userid;

  // for when user clicks on Delete button
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  // handles the mutation to delete the book from the db
  const deleteBook = (bookId: string, userId: number) => {
    return axios.delete(
      `http://localhost:5000/api/books/${bookId}/users/${userId}`
    );
  };

  const mutation = useMutation({
    mutationFn: ({ bookId, userId }: { bookId: string; userId: number }) =>
      deleteBook(bookId, userId),
  });

  const handleDelete = () => {
    mutation.mutate({ bookId, userId });
  };

  // when user selects a different option, launch UpdateBook component, passing target option and item in state
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate("/update", {
      state: {
        bookInfo: bookInfo,
        selectedStatus: (e.target as HTMLSelectElement).value,
      },
    });
  };

  return (
    <div className="pageContainer">
      {mutation.isSuccess ? (
        <h2>Your book has been deleted</h2>
      ) : (
        <>
          <Button onClick={() => navigate(-1)}>Back</Button>
          <DisplayDbBook item={bookInfo} format={"full"} />
          <div className="selectContainer">
            <label htmlFor="bookshelfSelect"></label>
            <select
              name="bookshelfSelect"
              id="bookshelfSelect"
              onChange={handleChange}
              value={bookInfo.status}
            >
              <option value="read">Read</option>
              <option value="toRead">Want to Read</option>
              <option value="currentlyReading">Currently Reading</option>
            </select>
            {bookInfo.dateRead ? <h4>Date read: {bookInfo.dateRead}</h4> : null}
            <Button onClick={() => setConfirmDelete(true)}>Delete Book</Button>

            {mutation.isLoading ? (
              "Deleting book from bookshelf..."
            ) : (
              <>
                {mutation.isError ? (
                  <div>
                    An error occurred: {(mutation.error as Error).message}
                  </div>
                ) : null}
              </>
            )}
            {confirmDelete ? (
              <div className="deleteModal">
                <h2>
                  Are you sure you want to permanently delete this book from
                  your bookshelf?
                </h2>
                <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                <Button onClick={handleDelete}>Delete Book</Button>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
