import { axioAuth } from "@/services/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GetCategory = async (page: any) => {
  const data = axioAuth
    .get("categories", {
      params: {
        page: page || 1,
      },
    })
    .then((res: any) => res.data)
    .catch((err: string) => err);
  return data;
};
export const GetCategorySimple = (page: any) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axioAuth
      .get("categories", {
        params: {
          page: page || 1,
        },
      })
      .then((res: any) => setData(res.data))
      .catch((err: any) => err);
  }, []);
  return data;
};

export const UseAddCategory = async (values: any) => {
  await axioAuth
    .post("categories", values)
    .then((res: any) => {
      toast("Thêm danh mục thành công!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        type: "success",
      });
    })
    .catch((err: any) => {
      toast(err.response.data.message.split(":")[2], {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        type: "error",
      });
    });
};

export const UseEditCategory = async (values: any, id: string) => {
  await toast.promise(axioAuth.put(`categories/${id}`, values), {
    pending: "Loading....",
    success: "Edit category success! 👌",
    error: "Edit category fail!  🤯",
  });
};

export const UseDeleteCategory = async (id: string) => {
  await axioAuth
    .delete(`categories/${id}`)
    .then((res: any) => {
      toast(" Delete category success!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        type: "success",
      });
    })
    .catch((err: any) => {
      toast(err.response.data.message.split(":")[2], {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        type: "error",
      });
    });
};
