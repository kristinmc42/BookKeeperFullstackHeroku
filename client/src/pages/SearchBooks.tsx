import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";

// components
import SearchBar from "../components/SearchBar";
import { DisplayGoogleBook } from "../components/DisplayBook";

// searches Google Books API based on input from user and displays results
const SearchBooks: React.FC = () => {
  const queryClient = useQueryClient(); // get queryClient from the context

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

  // for search bar input
  const [text, setText] = useState<string>("");

  // when user types in search bar input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setText(target.value);
  };

  // to clear search
  const handleClear = () => {
    localStorage.clear();
    setText("");
    setInputValue(null);
    queryClient.invalidateQueries("googleBooks", inputValue);
  };

  // when form submitted, save input value in local storage
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      searchBarContents: { value: "string" };
    };
    const value = formElements.searchBarContents.value;
    setInputValue(value);
    localStorage.setItem("searchValue", JSON.stringify(value));
  };

  // returns array of book objects (max that can be returned is 40 items)
  const getBooks = async () => {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&maxResults=40&startIndex=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.items && res.data.items.length > 0) {
          return res.data.items;
        }
      })
      .catch((err: Error) => {
        console.log(err.message);
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
    <div className="searchContainer">
      <SearchBar
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={text}
        placeholderText={"Title, Author, Keyword..."}
      />

      <button type="button" className="clearSearch" onClick={handleClear}>
        Clear Search
      </button>

      <ul>
        {isSuccess && data && data.length > 0 ? (
          data.map((item: any, index: number) => {
            return (
              <li key={index}>
                <Link to={`${item.id}`}>
                  <DisplayGoogleBook item={item} format={"short"} />
                </Link>
              </li>
            );
          })
        ) : isSuccess && !data ? (
          <>
            <span className="message">
              Sorry. No results were found. Please try again
            </span>
          </>
        ) : null}
      </ul>

      {/* loading and error messages for useQuery*/}
      {isLoading || isFetching ? (
        <span className="message">Loading...</span>
      ) : null}
      {isError ? (
        <span className="message">
          An error occurred: {(error as Error).message}
        </span>
      ) : null}
    </div>
  );
};

export default SearchBooks;
