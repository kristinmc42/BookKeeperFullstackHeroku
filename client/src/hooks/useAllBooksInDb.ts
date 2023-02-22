import { useQuery, UseQueryResult } from "react-query";
import { Axios } from "../config";

// hook gets all book from db for current user
//  errors will be caught in react query where hook is called
export default function useAllBooksInDb(): UseQueryResult<any, unknown> {
  const getAllUsersBooks = async () => {
    return await Axios.get(`/api/books/`).then((res) => {
      return res.data;
    });
  };

  return useQuery("dbBooks", getAllUsersBooks);
}
