import * as React from "react";
import Input from "../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/features/globalSlice";
import { UseAddCategory } from "@/hooks/useCategory";

export interface AddCategoryProps {}

export default function AddCategory(props: AddCategoryProps) {
  const dispatch = useDispatch();
  const category = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Tên sản phẩm cần nhiều hơn 3 kí tự")
        .max(20, "Name must be 20 characters or less")
        .required("Tên sảng phẩm là bắt buộc"),
      description: Yup.string()
        .min(30, "Mô tả sản phẩm cần nhiều hơn 30 kí tự")
        .required("Mô tả là bắt buộc"),
    }),
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      await UseAddCategory(values).finally(() => {
        dispatch(setLoading(false));
        // setRender((r) => !r);
      });
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <div className="p-3 flex shadow-lg flex-col gap-y-4 bg-white rounded-lg">
      <h3 className="font-medium text-xl ">Add Category</h3>
      <form className="flex flex-col gap-y-10">
        <Input
          id="name"
          data={category.values.name}
          setData={category.handleChange}
          label="Name"
          placeholder="Please provide name product"
          error={category.errors.name}
        />
        <Input
          id="description"
          data={category.values.description}
          setData={category.handleChange}
          label="Description"
          placeholder="Please provide description product"
          error={category.errors.description}
        />
        <div className="btn-add-category flex justify-center items-center">
          <button className="add-category hover:opacity-80 transition-all bg-purple-600 px-3 text-sm   py-2 rounded-md text-white gap-x-3 flex justify-center items-center">
            <i className="bi text-lg bi-cart-plus"></i>
            <span>Add category</span>
          </button>
        </div>
      </form>
    </div>
  );
}
