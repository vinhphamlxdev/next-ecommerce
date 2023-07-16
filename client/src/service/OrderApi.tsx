import { IOrder } from "@/types/interface";
import axiosClient from "./axiosClient";

export const getAllOrder = async (params: any): Promise<any> => {
  const response = await axiosClient.get<any>(`/orders`, {
    params: params,
  });
  return response;
};
export const getOrderDetail = async (id: string | any): Promise<any> => {
  const response = await axiosClient.get(`/orders/${id}`);
  return response;
};
export const createOrder = async (data: any): Promise<any> => {
  const response = await axiosClient.post<any>(`/orders`, data);
  return response;
};
export const updateOrder = async (id: number): Promise<any> => {
  const response = await axiosClient.put<IOrder>(`/orders/${id}`);
  return response;
};
export const deleteOrder = async (id: number): Promise<any> => {
  const response = await axiosClient.delete(`/orders/${id}`);
  return response;
};
