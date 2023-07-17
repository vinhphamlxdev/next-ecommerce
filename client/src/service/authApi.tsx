import getFromCookie from "@/token/getFromCookie";
import setToCookie from "@/token/setToCookie";
import { ILoginResponse, IUser } from "@/types/authInterface";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = `http://localhost:8080`;

const authApi = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessToken = async () => {
  const response = await authApi.get<ILoginResponse>("auth/refresh");
  return response;
};

authApi.interceptors.request.use(
  (config) => {
    const accessToken = getFromCookie("access_token");
    console.log(accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
authApi.interceptors.response.use((response) => {
  let token = "";
  const { url } = response.config;
  if (url === "auth/login") {
    token = response.data.access_token;
    if (token) {
      setToCookie("access_token", token, {
        secure: true,
        "max-age": 3600,
      });
    }
  }
  return response;
});

export const signUpUserFn = async (user: Omit<IUser, "id">) => {
  const response = await authApi.post<IUser>("auth/register", user);
  return response.data;
};

export const loginUser = async (user: any) => {
  const response = await authApi.post<ILoginResponse>("auth/login", user);
  return response.data;
};

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await authApi.get<any>(
    `auth/verifyemail/${verificationCode}`
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await authApi.get<any>("auth/logout");
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<any>("users/me");
  return response.data;
};
