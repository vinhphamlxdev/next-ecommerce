import getFromCookie from "@/token/getFromCookie";
import setToCookie from "@/token/setToCookie";
import { ILoginResponse, IUser } from "@/types/authInterface";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = `http://localhost:8080`;

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
axiosConfig.interceptors.response.use((response) => {
  let token = "";
  const { url } = response.config;
  if (url?.includes("auth/login")) {
    token = response.data.access_token;
    if (token) {
      localStorage.setItem("access_token", token);
    }
  }
  return response;
});

export default axiosConfig;
