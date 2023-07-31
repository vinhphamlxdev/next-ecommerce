import {
  ICategory,
  ICategoryResponse,
  IFilters,
  IProduct,
} from "@/types/interface";
import axiosConfig from "./axiosConfig";

export const getAllCategory = async (param: any) => {
  const response = await axiosConfig.get(`/categorys`, {
    params: {
      pageNum: param.pageNum || 0,
      itemsPerPage: param.itemsPerPage || 5,
    },
  });
  return response.data;
};
export const getCategory = async (id: number) => {
  const response = await axiosConfig.get(`/categorys/${id}`);
  return response;
};
export const createCategory = async (category: Omit<ICategory, "id">) => {
  const response = await axiosConfig.post(`/categorys`, category);
  return response;
};
export const updateCategory = async (id: number, data: ICategory) => {
  const response = await axiosConfig.put(`/categorys/${id}`, data);
  return response;
};
export const deleteCategory = async (id: number) => {
  const response = await axiosConfig.delete(`categorys/${id}`);
  return response;
};
