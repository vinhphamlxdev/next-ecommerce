import axios from "axios";
import { ICategory, IPage } from "@/types/interface";
import axiosClient from "./axiosClient";
export interface ICategorysResponse {
  page: number;
  status: string;
  categorys: ICategory[];
}
export const getAllCategorys = async (): Promise<any> => {
  const response = await axiosClient.get<ICategorysResponse>(`/categorys`);
  return response;
};
export const getCategoryById = async (id: number): Promise<any> => {
  const response = await axiosClient.get<any>(`/categorys/${id}`);
  return response;
};
export const createCategory = async (data: ICategory): Promise<any> => {
  const response = await axiosClient.post<ICategory>(`/categorys`, data);
  return response;
};
export const updateCategory = async (
  id: number | unknown,
  data: ICategory
): Promise<any> => {
  const response = await axiosClient.put<ICategory>(`/categorys/${id}`, data);
  return response;
};
export const deleteCategoryById = async (
  id: number | unknown
): Promise<any> => {
  const response = await axiosClient.delete(`/categorys/${id}`);
  return response;
};
