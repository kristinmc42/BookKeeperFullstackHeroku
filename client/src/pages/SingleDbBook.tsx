import { AxiosError } from "axios";
import { Axios } from "../config";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

//components
import Button from "../components/Button";
import { DisplayDbBook } from "../components/DisplayBook";
import MessageCard from "../components/MessageCard";
import CardOverlay from "../components/CardOverlay";
import ErrorMessage from "../components/ErrorMessage";
// hooks
import useIsLoggedIn from "../hooks/useIsLoggedIn";
//styles
import { device } from "../styles/Breakpoints";

//types
import { DbBookInfo } from "../types";

// displays details of book from the db
export default function SingleDbBook() {
  const navigate = useNavigate();

  // get bookInfo passed in state
  const { state } = useLocation();

  const [bookInfo, setBookInfo] = useState<DbBookInfo | undefined>();

  useEffect(() => {
    if (state) {
      setBookInfo(state.book);
    }
  }, [state])
  

  // check user is logged in
  const isLoggedIn = useIsLoggedIn();

  // for when user clicks on Delete button
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  // handles the mutation to delete the book from the db
  const deleteBook = (bookId: string) => {
    return Axios.delete(`/api/books/${bookId}`);
  };

  const mutation = useMutation({
    mutationFn: ({ bookId }: { bookId: string }) => deleteBook(bookId),
  });

  const handleDelete = () => {
    if (bookInfo && bookInfo.bookid) {
      const bookId:string = bookInfo.bookid;
      mutation.mutate({ bookId });
    }
  };

  // when user selects a different option, launch UpdateBook component, passing target option and item in state
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate("/update", {
      state: {
        bookInfo: bookInfo,
        selectedStatus: e.target.value,
      },
    });
  };

  return (
    <Wrapper>
      {mutation.isSuccess ? (
        <DeletedBookContainer>
          <MessageCard navigateTo="/books">
            <h2>Your book has been deleted.</h2>
          </MessageCard>
        </DeletedBookContainer>
      ) : (
        <>
          {!isLoggedIn ? (
            <ErrorMessage>Please login to see your bookshelves</ErrorMessage>
          ) : (
            <>
                  <Button onClick={() => navigate(-1)}>Back</Button>
                  {
                    bookInfo && <DisplayDbBook item={bookInfo} format={"full"} />
                  }
              
              <BookStatusSection>
                {bookInfo?.dateRead && <h4>Date read: {bookInfo.dateRead}</h4>}
                <label htmlFor="bookshelfSelect">
                  Select a different bookshelf
                </label>
                <select
                  name="bookshelfSelect"
                  id="bookshelfSelect"
                  onChange={handleChange}
                  value={bookInfo?.status}
                >
                  <option value="read">Read</option>
                  <option value="toRead">Want to Read</option>
                  <option value="currentlyReading">Currently Reading</option>
                </select>
                <Button onClick={() => setConfirmDelete(true)}>
                  Delete Book
                </Button>

                {mutation.isLoading ? (
                  <StyledMessage>Deleting book from bookshelf...</StyledMessage>
                ) : (
                  <>
                    {mutation.isError && (
                      <ErrorMessage>
                        An error occurred:{" "}
                        {mutation.error instanceof AxiosError
                          ? mutation.error.message
                          : null}
                      </ErrorMessage>
                    )}
                  </>
                )}
              </BookStatusSection>
            </>
          )}
          {confirmDelete ? (
            <CardOverlay className="delete">
              <DeleteBookModal>
                <h2>
                  Are you sure you want to permanently delete this book from
                  your bookshelf?
                </h2>
                <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                <Button onClick={handleDelete}>Delete Book</Button>
              </DeleteBookModal>
            </CardOverlay>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}

// styled components
const Wrapper = styled.div`
  max-width: 1600px;
  width: 89%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  button {
    max-width: 75px;
    margin-bottom: 0.5em;
    align-self: start;
  }

  article {
    align-items: flex-start;
    border: 2px solid ${(props) => props.theme.colors.secondary};
    padding: 1.5em 0.5em 2em 0.5em;

    @media ${device.tablet} {
      min-height: 60vh;
    }
    section:first-child {
      max-width: none;
      div {
        padding-right: 1em;
      }
    }
  }

  .delete {
    top: 0;
  }

  @media (min-width: 600px) {
    min-height: 85vh;
  }
  @media ${device.tablet} {
    min-height: 80vh;
  }

  @media (orientation: landscape) and (hover: none) and (pointer: coarse) and (min-width: 600px) {
    justify-content: center;
    align-items: center;
    min-height: 65vh;
  }
  @media (orientation: landscape) and (hover: none) and (pointer: coarse) and (min-width: 830px) {
    min-height: 75vh;
  }
`;

const BookStatusSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1em;
  width: 100%;

  h4 {
    text-align: center;
  }
  label {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }
  select {
    height: 37px;
    color: ${(props) => props.theme.colors.whiteText};
    background-color: ${(props) => props.theme.colors.primary};
    border: 2px solid ${(props) => props.theme.colors.secondary};
    border-radius: 5px;
    padding: 0 0.5em;
    min-width: 150px;
    margin: 1em;
  }

  button {
    align-self: center;
    max-width: 260px;
    font-size: 0.9rem;
    margin: 1em;
    @media ${device.mobileM} {
      min-height: 37px;
      font-size: 1rem;
    }
  }
`;

const DeleteBookModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  width: 70%;
  min-height: 65vh;
  padding: 0.8em;

  h2 {
    font-size: 1.4em;
    text-align: center;
    line-height: 1.2;
  }
  button {
    min-width: 150px;
    align-self: center;
  }
  button:first-of-type {
    background-color: ${(props) => props.theme.colors.white};

    &:hover {
      color: ${(props) => props.theme.colors.secondary};
      background-color: ${(props) => props.theme.colors.black};
    }
  }

  @media ${device.tablet} {
    padding: 1em;
    width: 55%;
    min-height: 50vh;

    h2 {
      padding: 0 2em 1em 2em;
    }
  }
`;
const DeletedBookContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  @media (orientation: landscape) and (hover: none) and (pointer: coarse) and (max-width: 1023px) {
    height: 60vh;
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
