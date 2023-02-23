import axios from "axios";

let url: string = `http://localhost:5000`;
if (process.env.NODE_ENV === "production") {
  url = `${process.env.REACT_APP_API_URL}`;
}

export const Axios = axios.create({
  baseURL: url,
  withCredentials: true,
});
