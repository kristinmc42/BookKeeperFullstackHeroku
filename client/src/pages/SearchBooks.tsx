import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";

// components
import SearchBar from "../components/SearchBar";
import { DisplayGoogleBook } from "../components/DisplayBook";
import { device } from "../styles/Breakpoints";
import ErrorMessage from "../components/ErrorMessage";

// searches Google Books API based on input from user and displays results
const SearchBooks: React.FC = () => {
  const queryClient = useQueryClient(); // get queryClient from the context

  const [inputValue, setInputValue] = useState(() => {
    // get stored value from session storage if there is one
    const saved: string | null = sessionStorage.getItem("searchValue");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return null;
    }
  });

  // for search bar input
  const [text, setText] = useState<string>("");

  // to clear search
  const handleClear = () => {
    sessionStorage.clear();
    setText("");
    setInputValue(null);
    queryClient.invalidateQueries("googleBooks", inputValue);
  };

  // when form submitted, save input value in session storage
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      searchBarContents: { value: "string" };
    };
    const value = formElements.searchBarContents.value;
    setInputValue(value);
    sessionStorage.setItem("searchValue", JSON.stringify(value));
  };

  // returns array of book objects (max that can be returned is 40 items)
  const getBooks = async () => {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&maxResults=40&startIndex=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        { withCredentials: false }
      )
      .then((res) => {
        if (res.data.items && res.data.items.length > 0) {
          return res.data.items;
        }
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  };

  // useQuery for Google Books search -  when there is an inputValue
  const { isLoading, isError, error, isFetching, data, isSuccess } = useQuery(
    ["googleBooks", inputValue],
    getBooks,
    {
      enabled: !!inputValue,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  return (
    <Wrapper>
      <h1>Let's find a book!</h1>
      <SearchBar
        onSubmit={handleSubmit}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        onClick={handleClear}
        value={text}
        placeholderText={"Title, Author, Keyword..."}
      />

      <BookList>
        {isSuccess && data && data.length > 0 ? (
          data.map((item: any, index: number) => {
            return (
              <ListItem key={index}>
                <Link to={`${item.id}`}>
                  <DisplayGoogleBook item={item} format={"short"} />
                </Link>
              </ListItem>
            );
          })
        ) : isSuccess && !data ? (
          <>
            <StyledMessage className="message">
              Sorry. No results were found. Please try again
            </StyledMessage>
          </>
        ) : null}
      </BookList>

      {/* loading and error messages for useQuery*/}
      {isLoading || isFetching ? (
        <StyledMessage>Loading...</StyledMessage>
      ) : null}
      {isError ? (
        <ErrorMessage>
          An error occurred:{" "}
          {error instanceof AxiosError ? error.message : null}
        </ErrorMessage>
      ) : null}
    </Wrapper>
  );
};

export default SearchBooks;

// styled component
const Wrapper = styled.div`
  max-width: 1600px;
  min-height: 85vh;
  margin: 0 auto;

  h1 {
    font-size: 1.9em;
    padding-left: 1em;

    @media ${device.laptop} {
      padding-left: 1.5em;
    }
  }
`;
const ListItem = styled.li`
  width: 300px;
  margin: 20px auto;
  height: 100%;
  border: 2px solid ${(props) => props.theme.colors.secondary};
`;
const BookList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(1fr);
  align-items: stretch;
  gap: 0.5em;

  @media ${device.mobileM} {
    padding: 0.5em;
  }
`;
const StyledMessage = styled.h2`
  text-align: center;
  font-size: 1rem;
  padding-left: 0.5em;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.colors.secondary};
`;
