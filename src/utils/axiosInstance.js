import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API's base URL
  withCredentials: true, // Allows cookies to be sent with requests if needed
});

// Add a request interceptor to include the Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or another secure storage
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle errors before they are sent
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses and errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within 2xx triggers this
    return response;
  },
  (error) => {
    // Handle specific errors (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirecting to login.");
      localStorage.removeItem("access-token"); // Clear invalid token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Reject other errors for further handling
  }
);

const useaxiosInstance = () => {
  return axiosInstance;
};

export default useaxiosInstance;
