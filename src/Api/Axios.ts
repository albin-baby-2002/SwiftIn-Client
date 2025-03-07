import axios from "axios";

export const BASE_URL = "https://swiftin-server.onrender.com/api";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
