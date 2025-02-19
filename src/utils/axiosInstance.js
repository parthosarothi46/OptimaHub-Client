import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://b10a12.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirecting to login.");
      localStorage.removeItem("access-token");
    }
    return Promise.reject(error);
  }
);

const useaxiosInstance = () => {
  return axiosInstance;
};

export default useaxiosInstance;
