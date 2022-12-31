import React from "react";

const SearchBar = ({
  onSubmit,
  placeholderText,
}: {
  onSubmit: any;
  placeholderText?: string;
}) => {
  return (
    <form className="searchBarContainer" onSubmit={onSubmit}>
      <label htmlFor="searchBarContents">Search</label>
      <input type="text" id="searchBarContents" placeholder={placeholderText} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
