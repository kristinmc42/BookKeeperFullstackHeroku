import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// components
import { DisplayGoogleBook } from "../components/DisplayBook";
import Button from "../components/Button";

// hooks
import useBookSearch from "../hooks/useBookSearch";
import ErrorMessage from "../components/ErrorMessage";

// types
type BookParams = {
  bookId: string;
};

// Displays more information on the book from Google books API that was selected by the user

const SingleSearchBook: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<BookParams>();

  // use custom hook to retrieve book info from Google books API
  const { data, error, isError, isLoading, isFetching } = useBookSearch(bookId);

  if (isLoading || isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }

  if (isError) {
    if (error instanceof Error) {
      return <ErrorMessage>Error: {error.message}</ErrorMessage>;
    }
  }

  return (
    <Wrapper>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <DisplayGoogleBook item={data} format={"full"} />
      <Button
        type="button"
        onClick={() => navigate("/add", { state: { bookInfo: data } })}
      >
        Add to my books
      </Button>
    </Wrapper>
  );
};

export default SingleSearchBook;

// styled components
const Wrapper = styled.div`
  max-width: 1600px;
  width: 89%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  min-height: 85vh;

  article {
    align-items: flex-start;
    border: 2px solid ${(props) => props.theme.colors.secondary};
    padding: 1.5em 0.5em 2em 0.5em;
    width: 95%;

    section:first-child {
      max-width: none;
      div {
        padding-right: 1em;
      }
    }
  }
  button {
    margin: 1em 0;
  }
`;
const StyledMessage = styled.h2`
  text-align: center;
  font-size: 1rem;
  padding-left: 0.5em;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.colors.secondary};
`;
