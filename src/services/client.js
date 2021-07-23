import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

export { baseClient };

const baseClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
  withCredentials: true,
});
