import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const useaxiosInstance = () => {
  return axiosInstance;
};

export default useaxiosInstance;
