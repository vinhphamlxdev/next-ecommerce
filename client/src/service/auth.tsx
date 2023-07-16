import axios from "axios";
import axiosClient from "./axiosClient";

export const axiosAuth = axios.create({
  baseURL: "http://localhost:8080",
});

export const AuthorizationHeader = (token: string) => {
  if (token) {
    axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosAuth.defaults.headers.common["Authorization"];
  }
};
export const createUser = async (data: any): Promise<any> => {
  const response = await axiosClient.post<any>(`/auth/register`, data);
  return response;
};
