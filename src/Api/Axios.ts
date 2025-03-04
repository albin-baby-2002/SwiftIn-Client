import axios from "axios";

export const BASE_URL = "http://127.0.0.1:3000/api";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
