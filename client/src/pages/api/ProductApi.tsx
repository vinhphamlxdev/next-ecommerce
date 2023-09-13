import { ICategory, IProduct } from "@/types/interface";
import axiosConfig from "./axiosConfig";
import axios from "axios";

export const getAllProduct = async (param: any) => {
  const response = await axiosConfig.get(`/products?isDelete=false`, {
    params: {
      pageNum: param.pageNum || 0,
      itemsPerPage: param.itemsPerPage || 6,
      category: param.category || "",
      sortfield: param.sortField || "",
      sortdir: param.sortDir || "",
      colorName: param.colorName || "",
      discount: param.discount || 0,
    },
  });
  return response.data;
};
export const getProductByKeyword = async (param: any) => {
  const response = await axiosConfig.get(`/search`, {
    params: {
      pageNum: param.pageNum || 0,
      itemsPerPage: param.itemsPerPage || 8,
      keyword: param.keyword || "",
    },
  });
  return response.data;
};
export const getProduct = async (id: number | string) => {
  const response = await axiosConfig.get(`/products/${id}`);
  return response.data.product;
};

export const getProductBySlug = async (slug: string) => {
  const response = await axiosConfig.get(`/products/slug/${slug}`);
  return response.data.product;
};

export const createProduct = async (formData: FormData) => {
  const response = await axiosConfig.post(`/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const updateProduct = async (id: number, formData: FormData) => {
  const response = await axiosConfig.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteProduct = async (id: number | string) => {
  const response = await axiosConfig.delete(`products/${id}`);
  return response.data;
};
