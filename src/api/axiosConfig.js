// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",  // o il tuo URL
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.tenantId) {
    config.headers['X-Tenant-ID'] = user.tenantId;
  }
  
  return config;
});

export default axiosInstance;
