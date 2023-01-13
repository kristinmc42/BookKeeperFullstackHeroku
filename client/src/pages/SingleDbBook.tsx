import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

//components
import BackButton from "../components/BackButton";
import { DisplayDbBook } from "../components/DisplayBook";

//types
import { DbBookInfo } from "../types";

export default function SingleDbBook() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const bookInfo: DbBookInfo = state.book;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // when user selects a different option, launch UpdateBook component, passing target option and item in state
    navigate("/update", {
      state: {
        bookInfo: bookInfo,
        selectedStatus: (e.target as HTMLSelectElement).value,
      },
    });
  };
  return (
    <div className="pageContainer">
      <BackButton />
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
      </div>
    </div>
  );
}
