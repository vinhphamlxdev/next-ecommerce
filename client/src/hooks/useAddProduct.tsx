import { axioAuth } from "@/services/auth";
import { toast } from "react-toastify";

export const getProduct = (page: any) => {
  const data = axioAuth
    .get("products", {
      params: {
        page: page || 1,
        isDeleted: false,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
  return data;
};

export const getProductDeleted = (page: any) => {
  const data = axioAuth
    .get("products", {
      params: {
        page: page || 1,
        isDeleted: true,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
  return data;
};

export const UseAddProduct = async (values: any) => {
  await toast.promise(axioAuth.post(`products`, values), {
    pending: "Loading....",
    success: "Add product success! 👌",
    error: "Add product fail!  🤯",
  });
};

export const UseProductDetail = async (id: string) => {
  const data = await axioAuth
    .get(`products/${id}`, {})
    .then((res) => res.data)
    .catch((err) => err);
  return data;
};

export const UseEditProduct = async (values: any, id: string) => {
  await toast.promise(axioAuth.put(`products/${id}`, values), {
    pending: "Loading....",
    success: "Edit product success! 👌",
    error: "Edit product fail!  🤯",
  });
};

export const UseDeleteProduct = (id: number) => {
  axioAuth
    .delete(`products/${id}`)
    .then((res) => {
      toast(" Delete product success!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        type: "success",
      });
    })
    .catch((err) => {
      toast(err.response.data.message.split(":")[2], {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        type: "error",
      });
    });
};

export const useRecoverProduct = async (id: string) => {
  await axioAuth
    .put(`products/${id}`, { isDeleted: false })
    .then((res) => {
      toast(" Recover product success!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        type: "success",
      });
    })
    .catch((err) => {
      toast(err.response.data.message.split(":")[2], {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        type: "error",
      });
    });
};
