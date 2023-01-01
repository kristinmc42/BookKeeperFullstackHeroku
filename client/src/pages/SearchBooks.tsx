import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

// components
import SearchBar from "../components/SearchBar";
import BookInfo from "../components/BookInfo";

const SearchBooks: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>();

  const getBooks = async () => {
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      )
      .then((res) => {
        if (res.data.items && res.data.items.length > 0) {
          return res.data.items;
        }
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Inside handleSubmit");
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      searchBarContents: { value: "string" };
    };
    setInputValue(formElements.searchBarContents.value);
  };

  const { isLoading, isError, error, isFetching, data } = useQuery(
    ["googleBooks", inputValue],
    getBooks,
    { enabled: !!inputValue }
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    console.log(error);
    return <h2>Error!</h2>;
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
      <ul>
        {data &&
            data.map((item: any, index: number) =>  <BookInfo item={item} key={index} />)}
      </ul>
    </div>
  );
};

export default SearchBooks;
