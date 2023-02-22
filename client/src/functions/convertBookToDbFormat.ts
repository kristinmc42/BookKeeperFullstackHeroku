import { BookInfo, DbBookInfo } from "../types";
import convertGenres from "./convertGenres";

  // function to convert GoogleBook info to DB format
 export const convertBookToDbFormat = (
    bookInfo: BookInfo,
    bookshelf: string | undefined,
    dateReadString: string | undefined,
 ) => {
   
   const newGenreString: string | undefined = convertGenres((bookInfo.volumeInfo.categories));
   
    const bookToStore: DbBookInfo = {
      title: bookInfo.volumeInfo.title,
      subtitle: bookInfo.volumeInfo.subtitle
        ? bookInfo.volumeInfo.subtitle
        : undefined,
      author: bookInfo.volumeInfo.authors ?bookInfo.volumeInfo.authors.join(", ") :undefined,
      genre: newGenreString,
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
      dateRead: dateReadString ? dateReadString : undefined,
      status: bookshelf ? bookshelf : undefined, // read/toRead/currentlyReading
    };

    return bookToStore;
  };