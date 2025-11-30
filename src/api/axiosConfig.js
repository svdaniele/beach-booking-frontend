// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",  // o il tuo URL
  withCredentials: true,
});

export default axiosInstance;
