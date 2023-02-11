import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

// types
import { DbBookInfo } from "../types";

// hook gets book from db for current user with specific bookid
//  error if book not in db for the user will be caught in react query where hook is called

export default function useBookInDb(
  bookId: string | undefined,
  initialBookData: DbBookInfo | undefined
): UseQueryResult<any, unknown> {
  const getBookByBookId = async () => {
    return axios

    // .get(`http://localhost:5000/api/books/${bookId}`)
      .get(`https://${process.env.REACT_APP_API_URL}/api/books/${bookId}`)
      .then((res) => {
        return res.data;
      });
  };

  return useQuery(["book", bookId], getBookByBookId, {
    enabled: !!bookId,
    initialData: initialBookData ?initialBookData :undefined
  });
}
