import { useState } from "react";
import Input from "@/Admin/components/Input";
import Select from "@/Admin/components/Select";
import LayoutAdmin from "@/Admin/components/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { formData } from "@/utils/formData";
import { AiOutlineCloudUpload } from "react-icons/ai";
import SelectImage from "@/Admin/components/SelectImage";
import { ICategory, IColor, ISize } from "@/types/interface";
import { toast } from "react-toastify";
import axios from "axios";
import UseDisabled from "@/hooks/useDisabled";
import LoadingButton from "@/Admin/components/Loading/LoadingButton";
import { createProduct } from "@/pages/api/ProductApi";
import ChooseSize from "@/Admin/components/ChooseSize";
import ChooseColor from "@/Admin/components/ChooseColor";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
export default function AddProduct() {
  const [select, setSelect] = useState<any>();
  const [imgs, setImgs] = useState<any>([]);
  const [files, setFile] = useState<File[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [colors, setColors] = useState<IColor[]>([]);
  const router = useRouter();
  const { data, isLoading, error, isSuccess, mutate } = useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: () => {
      toast.success("Thêm sản phẩm thành công");
      productFormik.resetForm();
      setImgs([]);
      setFile([]);
      setSizes([]);
      setColors([]);
      router.push("/admin/products");
    },
    onError: (err: any) => {
      console.log("Coloi:", err);
      if (
        err &&
        (err?.response?.status === 401 || err?.response?.status === 403)
      ) {
        toast.error(`Không được cấp quyền!`);
      }
    },
  });
  const productFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      quantity: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(10, "Tên sản phẩm cần nhiều hơn 3 kí tự")
        .max(70, "Tên sản phẩm tối đa 70 kí tự")
        .required("Tên sản phẩm là bắt buộc"),
      description: Yup.string()
        .min(20, "Mô tả nên nhiều hơn 20 kí tự")
        .required("Mô tả sản phẩm là bắt buộc"),
      price: Yup.number()
        .min(0, "Giá tối thiểu phải là 0đ")
        .required("Giá sản phẩm là bắt buộc")
        .typeError("Giá sản phẩm phải là số"),
      discountPrice: Yup.number()
        .test(
          "is-less-than-price",
          "Giá giảm phải thấp hơn giá gốc!",
          function (value) {
            const { price } = this.parent; // Lấy giá trị của trường 'price' trong đối tượng cha
            return value === undefined || value < price; // Kiểm tra giá trị giảm có nhỏ hơn giá gốc hay không
          }
        )
        .min(0, "Giá giảm tối thiểu phải là 0đ")
        .required("Giá giảm sản phẩm là bắt buộc")
        .typeError("Giá sản phẩm phải là số"),
      quantity: Yup.number()
        .min(1, "Số lượng phải lớn hơn 0")
        .max(5000, "Số lượng tối đa là 5000")
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
      const { name, price, description, quantity, discountPrice } = values;
      const newFormData = new FormData();
      newFormData.append("name", name);
      newFormData.append("shortDescription", description);
      newFormData.append("price", price);
      newFormData.append("discountPrice", discountPrice);
      newFormData.append("quantity", quantity);
      newFormData.append("category", select?.id);
      const sizeNames = sizes.map((size: ISize) => size.name);
      for (let index = 0; index < sizeNames.length; index++) {
        const sizeName = sizeNames[index];
        newFormData.append(`sizes[${index}]`, sizeName);
      }
      const colorNames = colors.map((color: IColor) => color.colorName);
      for (let index = 0; index < colorNames.length; index++) {
        const colorName = colorNames[index];
        newFormData.append(`colors[${index}]`, colorName);
      }
      for (let index = 0; index < files.length; index++) {
        newFormData.append(`images[${index}]`, files[index]);
      }

      mutate(newFormData);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const { isDisabled, disabledStyle } = UseDisabled(isLoading);
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
            label="Giá gốc sản phẩm"
            placeholder="Vui lòng điền giá sản phẩm"
            error={productFormik.errors.price}
          />
          <Input
            id="discountPrice"
            data={productFormik.values.discountPrice}
            setData={productFormik.handleChange}
            label="Giá khuyến mãi"
            placeholder="Vui lòng điền giá khuyến mãi, không bắt buộc"
            error={productFormik.errors.discountPrice}
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
