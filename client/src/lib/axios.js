import axios from "axios";

// create an axios instance to be dynamic based on the ENV
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000/api"
      : "/api",
  withCredentials: true,
});
