import { useQuery, UseQueryResult } from "react-query";
import { Axios } from "../config";

// hook gets all book from db for current user

export default function useAllBooksInDb(): UseQueryResult<any, unknown> {
  const getAllUsersBooks = async () => {
    return await Axios
      // .get(`http://localhost:5000/api/books/`)

      .get(`/api/books/`)
      .then((res) => {
        return res.data;
      });
  };

  return useQuery("dbBooks", getAllUsersBooks);
}
