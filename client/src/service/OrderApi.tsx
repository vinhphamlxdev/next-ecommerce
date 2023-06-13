import { IOrder } from "@/types/interface";
import axiosClient from "./axiosClient";

export const getAllOrders = async (): Promise<any> => {
  const response = await axiosClient.get<any>(`/orders`);
  return response.data;
};
export const getOrderById = async (id: number): Promise<any> => {
  const response = await axiosClient.get(`/orders/${id}`);
  return response.data;
};
export const createOrder = async (): Promise<any> => {
  const response = await axiosClient.post<IOrder>(`/orders`);
  return response.data;
};
export const updateOrder = async (id: number): Promise<any> => {
  const response = await axiosClient.put<IOrder>(`/orders/${id}`);
  return response.data;
};
export const deleteOrder = async (id: number): Promise<any> => {
  const response = await axiosClient.delete(`/orders/${id}`);
  return response.data;
};
