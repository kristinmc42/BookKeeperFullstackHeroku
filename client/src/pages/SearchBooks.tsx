import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

// components
import SearchBar from "../components/SearchBar";


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
          data.map((item: any) => {
             return(
              <li key={item.id}>
                {item.volumeInfo.imageLinks.smallThumbnail ? (
                  <img
                    src={item.volumeInfo.imageLinks.smallThumbnail}
                    alt={`Cover of {item.volumeInfo.title}`}
                  />
                ) : null}
                <h2>{item.volumeInfo.title}</h2>
                {item.volumeInfo.authors
                  ? item.volumeInfo.authors.map((author: string, index:number) => (
                      <h3 key={index+item.id}>
                        <span>By: </span>
                        {author}
                      </h3>
                    ))
                  : null}
                {item.volumeInfo.categories
                  ? item.volumeInfo.categories.map((genre: string, index:number) => (
                      <h3 key={index+item.id}>
                        <span>Genre: </span>
                        {genre}
                      </h3>
                    ))
                  : null}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchBooks;
