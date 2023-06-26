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
import { toast } from "react-toastify";
import axios from "axios";
import UseDisabled from "@/hooks/useDisabled";
import LoadingButton from "@/Admin/components/Loading/LoadingButton";
import { createProduct } from "@/service/ProductApi";
export interface AddProductProps {}

export default function AddProduct(props: AddProductProps) {
  const [select, setSelect] = useState<ICategory[] | any>();
  const [imgs, setImgs] = useState<any>([]);
  const [files, setFile] = useState<File[]>([]);
  const router = useRouter();

  const productFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      quantity: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(10, "Tên sản phẩm cần nhiều hơn 3 kí tự")
        .max(70, "Tên sản phẩm tối đa 20 kí tự")
        .required("Tên sản phẩm là bắt buộc"),
      description: Yup.string()
        .min(30, "Mô tả nên nhiều hơn 30 kí tự")
        .required("Mô tả sản phẩm là bắt buộc"),
      price: Yup.number()
        .min(100000, "Giá tối thiểu phải là 100000")
        .max(1000000, "Giá tối đa phải là 1000000")
        .required("Giá sản phẩm là bắt buộc"),
      quantity: Yup.number()
        .min(1, "Số lượng phải lớn hơn 0")
        .max(500, "Số lượng tối đa là 500")
        .required("Số lượng là bắt buộc"),
    }),

    onSubmit: async (values) => {
      if (!select || !select.length) {
        toast.error("Vui lòng chọn danh mục");
        return;
      }
      if (!imgs || !imgs.length) {
        toast.error("Vui lòng chọn ảnh sản phẩm");
        return;
      }
      const { name, price, description, quantity } = values;
      const categoryIds = select.map((c: ICategory, index: number) => c.id);
      const newFormData = new FormData();
      newFormData.append("name", name);
      newFormData.append("description", description);
      newFormData.append("price", price);
      newFormData.append("quantity", quantity);
      newFormData.append("categories", categoryIds);
      for (let index = 0; index < files.length; index++) {
        newFormData.append(`images[${index}]`, files[index]);
      }

      const response = await axios.post(
        `http://localhost:8080/products`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        router.push("/admin/products");
        toast.success("Thêm sản phẩm thành công");
      } else {
        toast.error("Thêm sản phẩm thất bại");
      }
      console.log(response);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const { isDisabled, disabledStyle } = UseDisabled(productFormik.isSubmitting);
  return (
    <LayoutAdmin>
      <div className="add-product-page  p-3 bg-white shadow-md rounded-md">
        <h3 className="font-medium text-xl">Add Product</h3>
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
            id="quantity"
            data={productFormik.values.quantity}
            setData={productFormik.handleChange}
            label="Quantity"
            placeholder="Please provide quantity product"
            error={productFormik.errors.quantity}
          />

          <Select
            id="selectOption"
            label=""
            select={select}
            setSelect={setSelect}
          />
          <SelectImage
            file={files}
            setFile={setFile}
            images={imgs}
            setImage={setImgs}
          />
          <button
            disabled={isDisabled}
            style={disabledStyle}
            type="submit"
            className="add-category hover:opacity-80 transition-all bg-saveBg px-3 text-sm   py-2 rounded-md text-white gap-x-3 flex justify-center items-center"
          >
            {isDisabled ? <LoadingButton /> : <span>Add category</span>}
          </button>
        </form>
      </div>
    </LayoutAdmin>
  );
}
