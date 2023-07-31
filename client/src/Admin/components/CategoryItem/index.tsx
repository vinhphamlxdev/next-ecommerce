import UseDisabled from "@/hooks/useDisabled";
import { ICategory, IFilters } from "@/types/interface";
import getMessage from "@/utils/notification";
import axios from "axios";
import { useFormik } from "formik";
import * as React from "react";
import { BiSave } from "react-icons/bi";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import LoadingButton from "../Loading/LoadingButton";
import { useRouter } from "next/router";
import notification from "@/utils/notification";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "@/pages/api/CategoryApi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import DeleteCategoryButton from "./DeleteCategoryButton";
export interface ICategoryItemProps {
  category: ICategory;
  id: number;
  filters: IFilters;
}

export default function CategoryItem({
  category,
  id,
  filters,
}: ICategoryItemProps) {
  const [edit, setEdit] = React.useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, data, isSuccess, mutate } = useMutation({
    mutationFn: (category: Omit<ICategory, "id">) =>
      updateCategory(id, category),
    onSuccess(data: any) {
      queryClient.setQueryData(["category", id], data);
      toast.success("Cập nhật danh mục thành công");
    },
    onError(error: any) {
      notification(error?.response.data, "error");
      console.log("Có lỗi:", error);
    },
  });

  const categoryFormik = useFormik({
    initialValues: {
      name: category.name,
      description: category.description,
    },

    onSubmit: async (values) => {
      if (!values.description || !values.name) {
        toast.error("Tên danh mục hoặc mô tả là bắt buộc");
        return;
      }
      if (values.name.length < 5) {
        toast.error("Tên danh mục tối thiểu 5 kí tự");
        return;
      }
      if (values.description.length < 20) {
        toast.error("Mô tả danh mục tối thiểu 20 kí tự");
        return;
      }
      let data = {
        name: values.name,
        description: values.description,
      };

      mutate(data);
      setEdit(false);
    },
  });

  const { disabledStyle, isDisabled } = UseDisabled(isLoading);
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col all-category gap-y-5 bg-white px-3 py-2 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            {!edit && (
              <i
                onClick={() => setEdit(true)}
                className="bi bi-pencil text-saveBg text-base cursor-pointer"
              ></i>
            )}
          </div>
          <DeleteCategoryButton
            filters={filters}
            categoryId={id}
          ></DeleteCategoryButton>
        </div>
        <form
          onSubmit={categoryFormik.handleSubmit}
          className="flex flex-col gap-y-5"
        >
          <div className="category-name">
            <input
              className="px-3 w-full capitalize text-gray-500 py-3 bg-[#edede9]"
              disabled={!edit}
              id="name"
              name="name"
              type="text"
              value={categoryFormik.values.name}
              onChange={categoryFormik.handleChange}
            />
          </div>
          <div className="category-desc">
            <textarea
              disabled={!edit}
              defaultValue={categoryFormik.values.description}
              className="bg-[#edede9] capitalize font-normal outline-none py-4 px-3 text-base text-gray-600 w-full resize-y"
              name="description"
              id="description"
              onChange={categoryFormik.handleChange}
            ></textarea>
          </div>
          {edit && (
            <button
              disabled={isDisabled}
              style={disabledStyle}
              type="submit"
              className="add-category   shadow-md  hover:opacity-80 transition-all bg-saveBg px-3 text-sm   py-2 rounded-md text-white gap-x-1 flex justify-center items-center"
            >
              {isDisabled ? (
                <LoadingButton />
              ) : (
                <>
                  <BiSave></BiSave>
                  <span>Save</span>
                </>
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
