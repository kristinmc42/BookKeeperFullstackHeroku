import axios from "axios";

export const Axios = axios.create({
    baseURL: `https://${process.env.REACT_APP_API_URL}/api`,
    withCredentials: true,
})