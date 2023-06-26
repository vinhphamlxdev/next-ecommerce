import * as React from "react";
import Input from "../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UseAddCategory } from "@/hooks/useCategory";
import { useGlobalStore } from "@/store/globalStore";
import slugify from "slugify";
import axios from "axios";
import { ICategory } from "@/types/interface";
import getMessage from "@/utils/getMessage";
import { toast } from "react-toastify";
import UseDisabled from "@/hooks/useDisabled";
import LoadingButton from "../Loading/LoadingButton";
import { createCategory } from "@/service/CategoryApi";

export interface AddCategoryProps {
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  categorys: ICategory[];
}

export default function AddCategory({
  setRender,
  categorys,
}: AddCategoryProps) {
  const { isLoading, setLoading } = useGlobalStore((state) => state);
  const categoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(10, "Tên danh mục cần nhiều hơn 10 kí tự")
        .max(30, "Tên danh mục tối đa 30 kí tự")
        .required("Tên danh mục là bắt buộc"),
      description: Yup.string()
        .min(30, "Mô tả danh mục cần nhiều hơn 30 kí tự")
        .required("Mô tả là bắt buộc"),
    }),
    onSubmit: async (values) => {
      if (!values) {
        return;
      }
      let data = {
        name: values.name,
        description: values.description,
        slug: slugify(values.name),
      };
      let checkDuplicate = categorys.some((c) => c.name === data.name);
      if (checkDuplicate) {
        getMessage(
          "Tên danh mục hoặc mô tả danh mục không được trùng nhau",
          "error"
        );
        return;
      }
      try {
        const response = await createCategory(data);
        categoryFormik.resetForm();
        toast.success("Thêm danh mục thành công");
      } catch (error) {
        console.log(error);
        toast.error("Thêm danh mục thất bại");
      } finally {
        setRender((prevR) => !prevR);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const { disabledStyle, isDisabled } = UseDisabled(
    categoryFormik.isSubmitting
  );

  return (
    <>
      <div className="p-3  flex shadow-lg flex-col gap-y-4 bg-white rounded-lg">
        <h3 className="font-medium text-xl ">Add Category</h3>
        <form
          onSubmit={categoryFormik.handleSubmit}
          className="flex flex-col gap-y-10"
        >
          <Input
            id="name"
            data={categoryFormik.values.name}
            setData={categoryFormik.handleChange}
            label="Name"
            placeholder="Please provide name category"
            error={categoryFormik.errors.name}
          />
          <Input
            id="description"
            data={categoryFormik.values.description}
            setData={categoryFormik.handleChange}
            label="Description"
            placeholder="Please provide description category"
            error={categoryFormik.errors.description}
          />
          <div className="btn-add-category flex justify-center items-center">
            <button
              disabled={isDisabled}
              style={disabledStyle}
              type="submit"
              className={`add-category w-36 flex-shrink-0 h-11 select-none hover:opacity-80 transition-all bg-purple-600 px-3 text-sm   py-2 rounded-md text-white gap-x-3 flex justify-center items-center `}
            >
              {isDisabled ? (
                <LoadingButton />
              ) : (
                <>
                  <i className="bi text-lg bi-cart-plus"></i>
                  <span>Add category</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
