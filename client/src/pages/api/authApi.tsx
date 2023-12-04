import { ICategory, IProduct } from "@/types/interface";
import axiosConfig from "./axiosConfig";
import { ILoginResponse, IUser } from "@/types/authInterface";
export const getAllUser = async (param: any) => {
  const response = await axiosConfig.get(`/users`, {
    params: param,
  });
  return response.data;
};
export const registerUser = async (user: Omit<IUser, "id">) => {
  const response = await axiosConfig.post<IUser>("auth/register", user);
  return response.data;
};

export const loginUser = async (user: any) => {
  const response = await axiosConfig.post<ILoginResponse>("auth/login", user);
  return response.data;
};
