import React from "react";

// interfaces
interface SearchProps{
  onSubmit: any;
  placeholderText?: string;
}

const SearchBar = (props:SearchProps) => {
  // store the search data inputed by the user
  
  return (
    <form className="searchBarContainer" onSubmit={props.onSubmit}>
      <label htmlFor="searchBarContents">Search</label>
      <input type="text" id="searchBarContents" placeholder={props.placeholderText} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
