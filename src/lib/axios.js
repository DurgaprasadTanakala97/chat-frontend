import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-backend-0iad.onrender.com", 
  withCredentials: true,
});