import axios from "axios";

export const Axios = axios.create({
    baseURL: `http://localhost:5000`
    // baseURL: `https://${process.env.REACT_APP_API_URL}`,
    // withCredentials: true,
})
 // .get(`http://localhost:5000/api/books/`)