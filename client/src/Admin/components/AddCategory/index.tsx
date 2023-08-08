import * as React from "react";
import Input from "../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGlobalStore } from "@/store/globalStore";
import { ICategory, IFilters } from "@/types/interface";
import getMessage from "@/utils/notification";
import { toast } from "react-toastify";
import UseDisabled from "@/hooks/useDisabled";
import LoadingButton from "../Loading/LoadingButton";
import { createCategory } from "@/pages/api/CategoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export interface AddCategoryProps {
  categorys: ICategory[];
  filters: IFilters;
}

export default function AddCategory({ categorys, filters }: AddCategoryProps) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Omit<ICategory, "id" | "slug">) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categorys", filters],
      });
      categoryFormik.resetForm();
      toast.success("Thêm danh mục thành công");
    },
    onError: (err) => {
      toast.error(`Có lỗi ${err}`);
    },
  });
  const categoryFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Tên danh mục tối thiểu 5 kí tự")
        .max(50, "Tên danh mục tối đa 50 kí tự")
        .required("Tên danh mục là bắt buộc"),
      description: Yup.string()
        .min(20, "Mô tả danh mục cần nhiều hơn 20 kí tự")
        .required("Mô tả là bắt buộc"),
    }),
    onSubmit: async (values) => {
      if (!values) {
        return;
      }
      let data = {
        name: values.name,
        description: values.description,
      };
      let checkDuplicate = categorys.some((c) => c.name === data.name);
      if (checkDuplicate) {
        getMessage(
          "Tên danh mục hoặc mô tả danh mục không được trùng nhau",
          "error"
        );
        return;
      }
      mutate(data);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const { disabledStyle, isDisabled } = UseDisabled(isLoading);

  return (
    <>
      <div className="p-3  flex shadow-lg flex-col gap-y-4 bg-white rounded-lg">
        <h3 className="font-medium text-xl ">Thêm Danh Mục</h3>
        <form
          onSubmit={categoryFormik.handleSubmit}
          className="flex flex-col gap-y-10"
        >
          <Input
            id="name"
            data={categoryFormik.values.name}
            setData={categoryFormik.handleChange}
            label="Tên danh mục"
            placeholder="Vui lòng điền tên danh mục"
            error={categoryFormik.errors.name}
          />
          <Input
            id="description"
            data={categoryFormik.values.description}
            setData={categoryFormik.handleChange}
            label="Mô tả danh mục"
            placeholder="Vui lòng điền mô tả danh mục"
            error={categoryFormik.errors.description}
          />
          <div className="btn-add-category flex justify-center items-center">
            <button
              disabled={isDisabled}
              style={disabledStyle}
              type="submit"
              className={`add-category w-[158px] flex-shrink-0 h-11 select-none hover:opacity-80 transition-all bg-purple-600 px-3 text-sm   py-2 rounded-md text-white gap-x-3 flex justify-center items-center `}
            >
              {isDisabled ? (
                <LoadingButton />
              ) : (
                <>
                  <i className="bi text-lg bi-cart-plus"></i>
                  <span>Thêm Danh Mục</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
