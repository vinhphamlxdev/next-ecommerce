import { axiosAuth } from "@/services/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GetCategory = async (page: any) => {
  const data = axiosAuth
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
    axiosAuth
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
  await axiosAuth
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
  await toast.promise(axiosAuth.put(`categories/${id}`, values), {
    pending: "Loading....",
    success: "Edit danh mục thành công! 👌",
    error: "Edit danh mục thất bại!  🤯",
  });
};

export const UseDeleteCategory = async (id: string) => {
  await axiosAuth
    .delete(`categories/${id}`)
    .then((res: any) => {
      toast("Xóa danh mục thành công!", {
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
