import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DisplayDbBook } from "../components/DisplayBook";

export default function SingleDbBook() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const bookInfo = state.book; // bookInfo

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // when user selects a different option, launch UpdateBook component, passing target option and item in state
    navigate("/update", {
      state: {
        bookInfo: bookInfo,
        source: "db",
        selectedStatus: (e.target as HTMLSelectElement).value,
      },
    });
  };
  return (
    <>
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
    </>
  );
}
