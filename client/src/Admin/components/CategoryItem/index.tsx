import axiosClient from "@/service/axiosClient";
import getMessage from "@/utils/getMessage";
import axios from "axios";
import { useFormik } from "formik";
import * as React from "react";
import { BiSave } from "react-icons/bi";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import * as Yup from "yup";

export interface ICategoryItemProps {
  category: any;
  index: number;
  setData: React.Dispatch<React.SetStateAction<any>>;
  data: any;
  categorys: any;
  id: number;
}

export default function CategoryItem({
  category,
  index,
  setData,
  categorys,
  id,
}: ICategoryItemProps) {
  const categoryFormik = useFormik({
    initialValues: {
      name: category.name,
      description: category.description,
    },

    onSubmit: async (values) => {
      let data = {
        name: values.name,
        description: values.description,
        slug: slugify(values.name),
      };
      console.log(data);
      try {
        await axiosClient.put(`http://localhost:8080/${id}`, data);
        toast.success("Cap nhat danh muc thanh cong");
      } catch (error) {
        console.log("co loi", error);
      }
    },
  });
  const [edit, setEdit] = React.useState<boolean>(false);
  const deleteCatgory = (id: number, name: string) => {
    Swal.fire({
      text: `Bạn muốn xóa danh mục ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(
            `http://localhost:8080/categorys/${id}`
          );
          console.log(res);
          const newCategorys = categorys.filter((c: any) => c.id !== id);
          setData(newCategorys);
          getMessage("Đã xóa danh mục thành công!", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isDisabled = React.useMemo(() => {
    return categoryFormik.isSubmitting;
  }, [categoryFormik.isSubmitting]);
  const disabledStyle = React.useMemo(() => {
    return {
      opacity: isDisabled ? "0.5" : "1",
      cursor: isDisabled ? "not-allowed" : "pointer",
    };
  }, [isDisabled]);
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col all-category gap-y-5 bg-white px-3 py-2 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <span className="text-gray-500 text-base">{index + 1})</span>
            {!edit && (
              <i
                onClick={() => setEdit(true)}
                className="bi bi-pencil text-saveBg text-base cursor-pointer"
              ></i>
            )}
          </div>
          <button
            onClick={() => deleteCatgory(category.id, category.name)}
            className="delete-category "
          >
            <i className="bi text-red-500 text-xl cursor-pointer bi-trash"></i>
          </button>
        </div>
        <form
          onSubmit={categoryFormik.handleSubmit}
          className="flex flex-col gap-y-5"
        >
          <div className="category-name">
            <input
              className="px-3 w-full text-gray-500 py-3 bg-[#edede9]"
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
              className="bg-[#edede9] font-normal outline-none py-4 px-3 text-base text-gray-600 w-full resize-y"
              name="description"
              id="description"
              onChange={categoryFormik.handleChange}
            ></textarea>
          </div>
          {edit && (
            <button
              // disabled={isDisabled}
              // style={disabledStyle}
              type="submit"
              className="add-category   shadow-md  hover:opacity-80 transition-all bg-saveBg px-3 text-sm   py-2 rounded-md text-white gap-x-1 flex justify-center items-center"
            >
              <BiSave></BiSave>
              <span>Save</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
