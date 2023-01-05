import React, { useState } from "react";
import {  useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";

// components
import SearchBar from "../components/SearchBar";
import DisplayBook from "../components/DisplayBook";

const SearchBooks: React.FC = () => {
  // const queryClient = useQueryClient(); // get queryClient from the context

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [inputValue, setInputValue] = useState(() => {
    // get stored value from local storage if there is one
    const saved: string | null = localStorage.getItem("searchValue");
    if (saved) {
      console.log(saved);
      return JSON.parse(saved);
    } else {
      return null;
    }
  });

  // makes call to Google Books API based on input from user
  // returns array of book objects (max that can be returned is 40 items)
  const getBooks = async () => {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&maxResults=40&startIndex=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.items && res.data.items.length > 0) {
          setErrorMessage(null);
          return res.data.items;
        } else {
          throw Error("Sorry. No results were found. Please try again.");
        }
      })
      .catch((err: Error) => {
        console.log(err.message);
        const message = err.message;
        setErrorMessage(message);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Inside handleSubmit");

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      searchBarContents: { value: "string" };
    };
    const value = formElements.searchBarContents.value;
    setInputValue(value);
    localStorage.setItem("searchValue", JSON.stringify(value));
  };

  // useQuery called when there is an inputValue
  const { isLoading, isError, error, isFetching, data } = useQuery(
    ["googleBooks", inputValue],
    getBooks,
    {
      enabled: !!inputValue,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
      keepPreviousData: true,
    }
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    if (error instanceof Error) {
      return <h2>Error: {error.message}</h2>;
    }
  }

  if (data) {
    console.log(data);
  }
  return (
    <div className="searchContainer">
      <SearchBar
        onSubmit={handleSubmit}
        placeholderText={"Title, Author, Keyword..."}
      />
      {/* <button
        type="button"
        className="clearSearch"
        onClick={() => {
          localStorage.clear();
          setInputValue("")
          queryClient.invalidateQueries("googleBooks");
          console.log(inputValue)
        }}
      >
        Clear Search
      </button> */}
      {errorMessage && <h3>{errorMessage}</h3>}
      <ul>
        {data &&
          data.map((item: any, index: number) => {
            return (
              <li key={index}>
                <Link to={`${item.id}`}>
                  <DisplayBook item={item} format={"short"} />
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchBooks;
