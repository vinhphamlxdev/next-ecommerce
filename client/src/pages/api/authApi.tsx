import { ICategory, IProduct } from "@/types/interface";
import axiosConfig from "./axiosConfig";
import { ILoginResponse, IUser } from "@/types/authInterface";
import setToCookie from "@/token/setToCookie";
import Cookies from "js-cookie";
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
export const refetchToken = async () => {
  try {
    // Thực hiện yêu cầu tái lấy token mới từ máy chủ
    const response = await axiosConfig.post("/refresh-token");

    if (response.data) {
      const newToken = response.data?.token;

      // Lưu token mới vào cookies hoặc localStorage
      Cookies.set("jwt", newToken); // Hoặc window.localStorage.setItem('jwt', newToken);

      // Trả về token mới
      return newToken;
    } else {
      console.error("Không thể tái lấy token mới");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi tái lấy token mới:", error);
    return null;
  }
};
