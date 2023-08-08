import { ICategory, IProduct } from "@/types/interface";
import axiosConfig from "./axiosConfig";

export const getAllOrder = async (param: any) => {
  const response = await axiosConfig.get(`/orders`, {
    params: {
      pageNum: param.pageNum || 0,
      itemPerPage: param.itemPerPage || 5,
      status: param.status,
    },
  });
  return response.data;
};
export const getOrder = async (id: number | string) => {
  const response = await axiosConfig.get(`/orders/${id}`);
  return response.data;
};
export const createOrder = async (data: ICategory) => {
  const response = await axiosConfig.post(`/orders`, data);
  return response;
};
export const updateStatusOrder = async (
  id: number | string,
  status: string
) => {
  const response = await axiosConfig.put(`/orders/${id}`, status);
  return response;
};
export const deleteOrder = async (id: number | string) => {
  const response = await axiosConfig.delete(`orders/${id}`);
  return response;
};
