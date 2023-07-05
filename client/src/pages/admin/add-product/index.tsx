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
import ChooseSize from "@/Admin/components/ChooseSize";
import ChooseColor from "@/Admin/components/ChooseColor";
export interface AddProductProps {}

export default function AddProduct(props: AddProductProps) {
  const [select, setSelect] = useState<any>();
  const [imgs, setImgs] = useState<any>([]);
  const [files, setFile] = useState<File[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
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
        .min(0, "Giá tối thiểu phải là 0đ")
        .required("Giá sản phẩm là bắt buộc")
        .typeError("Giá sản phẩm phải là số"),
      quantity: Yup.number()
        .min(1, "Số lượng phải lớn hơn 0")
        .max(500, "Số lượng tối đa là 500")
        .required("Số lượng là bắt buộc")
        .typeError("Số lượng sản phẩm phải là số"),
    }),

    onSubmit: async (values) => {
      if (sizes.length === 0) {
        toast.error("Vui lòng chọn size sản phẩm");
        return;
      }
      if (colors.length === 0) {
        toast.error("Vui lòng chọn màu sản phẩm");
        return;
      }
      if (!select) {
        toast.error("Vui lòng chọn danh mục sản phẩm");
        return;
      }

      if (!imgs || !imgs.length) {
        toast.error("Vui lòng chọn ảnh sản phẩm");
        return;
      }
      const { name, price, description, quantity } = values;
      const newFormData = new FormData();
      newFormData.append("name", name);
      newFormData.append("shortDescription", description);
      newFormData.append("price", price);
      newFormData.append("quantity", quantity);
      newFormData.append("category", select?.id);
      for (let index = 0; index < sizes.length; index++) {
        const sizeName = sizes[index];
        newFormData.append(`sizes[${index}]`, sizeName);
      }
      for (let index = 0; index < colors.length; index++) {
        const colorName = colors[index];
        newFormData.append(`colors[${index}]`, colorName);
      }
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
        // router.push("/admin/products");
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
        <h3 className="font-medium mb-6 text-xl">Thêm Sản Phẩm</h3>
        <form
          onSubmit={productFormik.handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-y-10"
        >
          <Input
            id="name"
            data={productFormik.values.name}
            setData={productFormik.handleChange}
            label="Tên sản phẩm"
            placeholder="Vui lòng điền tên sản phẩm"
            error={productFormik.errors.name}
          />
          <Input
            id="description"
            data={productFormik.values.description}
            setData={productFormik.handleChange}
            label="Mô tả sản phẩm"
            placeholder="Vui lòng điền mô tả sản phẩm"
            error={productFormik.errors.description}
          />
          <Input
            id="price"
            data={productFormik.values.price}
            setData={productFormik.handleChange}
            label="Giá sản phẩm"
            placeholder="Vui lòng điền giá sản phẩm"
            error={productFormik.errors.price}
          />
          <Input
            id="quantity"
            data={productFormik.values.quantity}
            setData={productFormik.handleChange}
            label="Số lượng"
            placeholder="Vui lòng điền số lượng sản phẩm"
            error={productFormik.errors.quantity}
          />
          <ChooseSize sizes={sizes} setSizes={setSizes} id="sizes" />
          <ChooseColor colors={colors} setColors={setColors} id="colors" />
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
            {isDisabled ? <LoadingButton /> : <span>Thêm sản phẩm</span>}
          </button>
        </form>
      </div>
    </LayoutAdmin>
  );
}
