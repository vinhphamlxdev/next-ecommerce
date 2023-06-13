import { IProduct } from "@/types/interface";
import axiosClient from "./axiosClient";

export const getAllProducts = async (): Promise<any> => {
  const response = await axiosClient.get<any>(`/products`);
  return response;
};
export const getProductById = async (id: number): Promise<any> => {
  const response = await axiosClient.get(`/products/${id}`);
  return response;
};
export const createProduct = async (): Promise<any> => {
  const response = await axiosClient.post<IProduct>(`/products`);
  return response;
};
export const updateProduct = async (id: number): Promise<any> => {
  const response = await axiosClient.put<IProduct>(`/products/${id}`);
  return response;
};
export const deleteProduct = async (id: number): Promise<any> => {
  const response = await axiosClient.delete(`/products/${id}`);
  return response;
};
