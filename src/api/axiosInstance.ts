import axios, { type AxiosInstance } from "axios";

const api = import.meta.env.VITE_BASE_URL;

let axiosInstace: AxiosInstance = axios.create({
  baseURL: api,
});

axiosInstace.interceptors.request.use((config) => {
  let token = localStorage.getItem("Authorizaion")?.split(" ")[1];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstace;
