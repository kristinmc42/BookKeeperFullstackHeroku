import React from "react";

//types
import { BookInfo, DbBookInfo } from "../types";

// convert the format of the bookInfo from Google Books to the format to be saved in the db
export default function useConvertBookInfo({
  bookInfo,
  dateRead,
  bookshelf,
  userId,
}: {
  bookInfo: BookInfo;
  dateRead: Date | undefined;
  bookshelf: string | undefined;
  userId: number;
}) {
  const bookToStore: DbBookInfo = {
    title: bookInfo.volumeInfo.title,
    subtitle: bookInfo.volumeInfo.subtitle
      ? bookInfo.volumeInfo.subtitle
      : undefined,
    author: bookInfo.volumeInfo.authors
      ? bookInfo.volumeInfo.authors.join(",")
      : undefined,
    genre: bookInfo.volumeInfo.categories
      ? bookInfo.volumeInfo.categories.join(",")
      : undefined,
    img: bookInfo.volumeInfo.imageLinks?.smallThumbnail
      ? bookInfo.volumeInfo.imageLinks.smallThumbnail
      : undefined,
    desc: bookInfo.volumeInfo.description
      ? bookInfo.volumeInfo.description
      : undefined,
    pageCount: bookInfo.volumeInfo.pageCount
      ? bookInfo.volumeInfo.pageCount
      : undefined,
    previewLink: bookInfo.volumeInfo.previewLink
      ? bookInfo.volumeInfo.previewLink
      : undefined,
    language: bookInfo.volumeInfo.language
      ? bookInfo.volumeInfo.language
      : undefined,
    publishedDate: bookInfo.volumeInfo.publishedDate
      ? bookInfo.volumeInfo.publishedDate
      : undefined,
    bookid: bookInfo.id,
    dateRead: dateRead ? dateRead : undefined,
    status: bookshelf ? bookshelf :undefined, // read/toRead/currentlyReading
    userid: userId,
  };

  return bookToStore;
}
