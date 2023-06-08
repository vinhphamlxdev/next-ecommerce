import { useState } from "react";
import Input from "@/Admin/components/Input";
import Select from "@/Admin/components/Select";
import LayoutAdmin from "@/Admin/components/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { UseAddProduct } from "@/hooks/useAddProduct";
import { formData } from "@/utils/formData";
import { AiOutlineCloudUpload } from "react-icons/ai";
import SelectImage from "@/Admin/components/SelectImage";
import { ICategory } from "@/types/interface";
export interface AddProductProps {}

export default function AddProduct(props: AddProductProps) {
  const [select, setSelect] = useState<ICategory[] | any>();
  const [imgs, setImgs] = useState<string[]>([]);
  const [file, setFile] = useState<File[]>([]);
  const router = useRouter();
  const productFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      inStock: "",
      selectOption: "",
      images: [],
    },
    // validationSchema: Yup.object({
    //   name: Yup.string()
    //     .min(3, "Tên sản phẩm cần nhiều hơn 3 kí tự")
    //     .max(100, "Tên sản phẩm tối đa 20 kí tự")
    //     .required("Tên sản phẩm là bắt buộc"),
    //   description: Yup.string()
    //     .min(30, "Mô tả nên nhiều hơn 30 kí tự")
    //     .required("Mô tả sản phẩm là bắt buộc"),
    //   price: Yup.number()
    //     .min(0, "Giá phải lơn hơn 0")
    //     .required("Giá sản phẩm là bắt buộc"),
    //   inStock: Yup.number()
    //     .min(0, "Số lượng phải lớn hơn 0")
    //     .required("Số lượng là bắt buộc"),
    //   selectOption: Yup.string().required("vui lòng chọn danh mục sản phẩm!"),
    //   images: Yup.array()
    //     .min(1, "chọn ít nhất một ảnh")
    //     .max(5, "Chọn tối đa 5 ảnh")
    //     .test(
    //       "is-file-format",
    //       "Only JPG, PNG and GIF formats allowed",
    //       (value: any) =>
    //         value.every(
    //           (image: File) =>
    //             image.type === "image/jpeg" ||
    //             image.type === "image/png" ||
    //             image.type === "image/gif"
    //         )
    //     ),
    // }),

    onSubmit: async (values) => {
      const { name, price, description, inStock } = values;
      const newFormData = new FormData();
      newFormData.append("name", name);
      newFormData.append("description", description);
      newFormData.append("price", price);
      values.images.forEach((img, index) => {
        newFormData.append(`images[${index}]`, img);
      });
      // In ra dữ liệu trong FormData
      for (let pair of newFormData.entries()) {
        const [key, value] = pair;
        if (key.startsWith("images")) {
          console.log(key, value);
        }
      }
      // router.push("/admin/products");
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <LayoutAdmin>
      <div className="add-product-page  p-3 bg-white shadow-md rounded-md">
        <h3 className="font-medium text-xl ">Add Category</h3>
        <form
          onSubmit={productFormik.handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-y-10"
        >
          <Input
            id="name"
            data={productFormik.values.name}
            setData={productFormik.handleChange}
            label="Name"
            placeholder="Please provide name product"
            error={productFormik.errors.name}
          />
          <Input
            id="description"
            data={productFormik.values.description}
            setData={productFormik.handleChange}
            label="Description"
            placeholder="Please provide description product"
            error={productFormik.errors.description}
          />
          <Input
            id="price"
            data={productFormik.values.price}
            setData={productFormik.handleChange}
            label="Price"
            placeholder="Please provide price product"
            error={productFormik.errors.price}
          />
          <Input
            id="inStock"
            data={productFormik.values.inStock}
            setData={productFormik.handleChange}
            label="Quantity"
            placeholder="Please provide quantity product"
            error={productFormik.errors.inStock}
          />

          <Select
            id="selectOption"
            label=""
            select={select}
            setSelect={setSelect}
          />
          <SelectImage
            file={file}
            setFile={setFile}
            images={imgs}
            setImage={setImgs}
          />
          <button
            type="submit"
            className="add-category hover:opacity-80 transition-all bg-saveBg px-3 text-sm   py-2 rounded-md text-white gap-x-3 flex justify-center items-center"
          >
            <span>Add category</span>
          </button>
        </form>
      </div>
    </LayoutAdmin>
  );
}
