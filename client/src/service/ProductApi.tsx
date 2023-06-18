import { IProduct } from "@/types/interface";
import axiosClient from "./axiosClient";

export const getAllProducts = async (params: any): Promise<any> => {
  const response = await axiosClient.get<any>(`/products`, {
    params: params,
  });
  return response;
};
export const getProductById = async (id: number): Promise<any> => {
  const response = await axiosClient.get(`/products/${id}`);
  return response;
};
export const createProduct = async (data: any): Promise<any> => {
  const response = await axiosClient.post<any>(`/products`, data);
  return response;
};
export const updateProduct = async (id: number): Promise<any> => {
  const response = await axiosClient.put<IProduct>(`/products/${id}`);
  return response;
};
export const deleteProductById = async (id: number): Promise<any> => {
  const response = await axiosClient.delete(`/products/${id}`);
  return response;
};
