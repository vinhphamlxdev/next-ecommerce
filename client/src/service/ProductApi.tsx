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

export const deleteProductById = async (id: number): Promise<any> => {
  const response = await axiosClient.delete(`/products/${id}`);
  return response;
};
export const createProduct = async (formData: FormData) => {
  const response = await axiosClient.post<any>(`/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
export const updateProduct = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await axiosClient.patch<IProduct>(
    `products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};
