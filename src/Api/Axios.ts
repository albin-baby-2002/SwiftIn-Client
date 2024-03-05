import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
