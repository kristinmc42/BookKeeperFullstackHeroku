import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

// hook gets all book from db for current user

export default function useAllBooksInDb(
  userId: number | undefined
): UseQueryResult<any, unknown> {
  const getBookByUserId = async () => {
    return axios
      .get(`http://localhost:5000/api/books/${userId}`)
      .then((res) => {
        return res.data;
      });
  };

  return useQuery(["dbBooks", userId], getBookByUserId, {
    enabled: !!userId,
  });
}
