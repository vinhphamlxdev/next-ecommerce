import { useModalStore } from "@/store/modalStore";
import * as React from "react";
import ReactDOM from "react-dom";
import Select from "../Select";
import InputModal from "../InputModal/InputModal";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ICategory,
  IColor,
  IFilters,
  IProduct,
  ISize,
} from "@/types/interface";
import * as Yup from "yup";
import { useFormik } from "formik";
import UseDisabled from "@/hooks/useDisabled";
import SelectImage from "../SelectImage";
import LoadingButton from "../Loading/LoadingButton";
import { LoadingSpinner } from "../Loading";
import ChooseSize from "../ChooseSize";
import ChooseColor from "../ChooseColor";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getProduct, updateProduct } from "@/pages/api/ProductApi";
import invalidPrice from "@/utils/invalidPrice";
export interface IModalProductEditProps {
  productId: number;
  isOpenEditP: boolean;
  setSelectedId: React.Dispatch<React.SetStateAction<any>>;
  filters: IFilters;
}

export default function ModalProductEdit({
  productId,
  isOpenEditP,
  setSelectedId,
  filters,
}: IModalProductEditProps) {
  const [selectCategory, setCategory] = React.useState<ICategory[] | any>([]);
  const [sizes, setSizes] = React.useState<ISize[]>([]);
  const [colors, setColors] = React.useState<IColor[]>([]);
  const [imgs, setImgs] = React.useState<any>([]);
  const [files, setFile] = React.useState<File[]>([]);
  const [imgsDelete, setImgsDelete] = React.useState<string[] | any>([]);
  const [sizesDelete, setSizesDelete] = React.useState<number[] | any>([]);
  const [colorsDelete, setColorsDelete] = React.useState<number[] | any>([]);
  const { setOpenEditProduct } = useModalStore();
  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingGet } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: productId !== undefined,
    onSuccess: (data) => {
      setCategory(data?.category);
      setImgs(data?.imageUrls);
      const newSizes = data?.sizes?.filter(
        (size: { delete: any }) => !size.delete
      );
      const newColors = data?.colors?.filter(
        (color: { delete: any }) => !color.delete
      );
      setSizes(newSizes);
      setColors(newColors);
    },
    onError: (err: any) => {
      toast.error("Có lỗi:", err);
    },
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      updateProduct(productId as number, formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["products", filters],
      });
      setFile([]);
      setImgsDelete([]);
      setOpenEditProduct(false);
      toast.success("Cập nhật sản phẩm thành công");
    },
    onError: () => {
      setOpenEditProduct(false);
      setFile([]);
      setImgsDelete([]);
      setSizesDelete([]);
      setColorsDelete([]);
      toast.error("Cập nhật sản phẩm thất bại");
    },
    onSettled: () => {
      setSelectedId(null);
    },
  });

  const productEditFormik = useFormik({
    initialValues: {
      name: data?.name,
      shortDescription: data?.shortDescription,
      price: data?.price,
      quantity: data?.quantity,
      discountPrice: data?.discount?.discountPrice,
    },
    onSubmit: async (values: any) => {
      // Handle form submission
    },
    enableReinitialize: true,
  });

  const handleSubmitEditProduct = async (id: number) => {
    const { name, price, shortDescription, quantity, discountPrice } =
      productEditFormik.values;

    if (!selectCategory || selectCategory.length === 0) {
      toast.error("Vui lòng chọn danh mục sản phẩm");
      return;
    }
    if (!invalidPrice(price)) {
      toast.error("Giá không hợp lệ");
      return;
    }
    if (!invalidPrice(discountPrice)) {
      toast.error("Giá giảm không hợp lệ");
      return;
    }
    if (discountPrice > price) {
      toast.error("Giá giảm phải nhỏ  hơn giá gốc");
      return;
    }

    if (!invalidPrice(quantity)) {
      toast.error("Số lượng không hợp lệ");
      return;
    }
    if (!name) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    if (!shortDescription) {
      toast.error("Vui lòng nhập mô tả sản phẩm");
      return;
    }
    if (!imgs || !imgs.length) {
      toast.error("Vui lòng chọn ảnh sản phẩm");
      return;
    }
    const checkExist = sizes.some((size) => !size.delete);
    if (!checkExist || !sizes.length) {
      toast.error("Vui lòng chọn size sản phẩm");
      return;
    }
    const checkExistColor = colors.some((color) => !color.delete);
    if (!checkExistColor || !colors.length) {
      toast.error("Vui lòng chọn màu sản phẩm sản phẩm");
      return;
    }

    const newFormData = new FormData();
    newFormData.append("name", name);
    newFormData.append("shortDescription", shortDescription);
    newFormData.append("price", price);
    newFormData.append("discountPrice", discountPrice);
    newFormData.append("quantity", quantity);
    newFormData.append("category", selectCategory?.id);
    for (let index = 0; index < files.length; index++) {
      const imageFile = files[index];
      newFormData.append(`images[${index}]`, imageFile);
    }
    const sizeNames = sizes.map((size: any) => size.name);
    for (let index = 0; index < sizeNames.length; index++) {
      const sizeName = sizeNames[index];
      newFormData.append(`sizes[${index}]`, sizeName);
    }
    const colorNames = colors.map((color: any) => color.colorName);
    for (let index = 0; index < colorNames.length; index++) {
      const colorName = colorNames[index];
      newFormData.append(`colors[${index}]`, colorName);
    }
    newFormData.append("imgsDelete", imgsDelete);
    newFormData.append("sizesDelete", sizesDelete);
    newFormData.append("colorsDelete", colorsDelete);
    mutate(newFormData);
  };
  const handleCloseModal = () => {
    setOpenEditProduct(false);
    setSelectedId(null);
  };
  if (isLoadingGet) {
    return <LoadingSpinner />;
  }
  if (typeof document === "undefined")
    return <div className="modal_product-detail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`modal__product-detail flex w-full h-full inset-0 fixed z-[500] ${
        isOpenEditP ? "" : "hidden"
      }`}
    >
      <div
        onClick={handleCloseModal}
        className="absolute inset-0 z-20 bg-[#000] opacity-20 overlay"
      ></div>
      {isLoading && <LoadingSpinner />}
      <div className="p-3 max-h-[550px] has-scrollbar rounded-md relative bg-white w-[550px]  inset-0 m-auto z-[600]">
        <div className="flex gap-y-3 flex-col">
          <div className="modal-choose-category flex flex-col gap-y-3">
            <div className="text-base  mb-3 font-medium">Danh Mục</div>
            <Select
              id="selectOption"
              label=""
              select={selectCategory}
              setSelect={setCategory}
            />
            <ChooseSize
              sizes={sizes}
              setSizes={setSizes}
              sizesDelete={sizesDelete}
              setDeleteSizes={setSizesDelete}
              id="sizes"
            />
            <ChooseColor
              colors={colors}
              setColors={setColors}
              colorsDelete={colorsDelete}
              setDeleteColors={setColorsDelete}
              id="colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-3">
            <InputModal
              disabled={false}
              change={true}
              title="Tên sản phẩm"
              id="name"
              setData={productEditFormik.handleChange}
              value={productEditFormik.values.name || ""}
            />
            <InputModal
              disabled={false}
              change={true}
              id="price"
              setData={productEditFormik.handleChange}
              title="Giá gốc"
              value={productEditFormik.values.price ?? ""}
            />
            <InputModal
              disabled={false}
              change={true}
              id="discountPrice"
              setData={productEditFormik.handleChange}
              title="Giá khuyến mãi"
              value={productEditFormik.values.discountPrice ?? ""}
            />
            <InputModal
              disabled={false}
              change={true}
              id="quantity"
              setData={productEditFormik.handleChange}
              title="Số lượng"
              value={productEditFormik.values.quantity ?? ""}
            />
          </div>
          <div className="edit-product-desc">
            <div className="text-base mb-2 font-medium">Mô Tả</div>
            <textarea
              defaultValue={productEditFormik.values.shortDescription ?? ""}
              className="bg-[#edede9] capitalize font-normal outline-none py-4 px-3 text-base text-gray-600 w-full resize-y"
              name="shortDescription"
              id="shortDescription"
              onChange={productEditFormik.handleChange}
            ></textarea>
          </div>
          <SelectImage
            file={files}
            setFile={setFile}
            images={imgs}
            setImage={setImgs}
            colums={4}
            columGap={3}
            deleteImgs={imgsDelete}
            setDeleteImgs={setImgsDelete}
          />
          <button
            type="submit"
            onClick={() => handleSubmitEditProduct(productId as number)}
            className="add-category hover:opacity-80 transition-all bg-saveBg px-3 text-sm   py-2 rounded-md text-white gap-x-3 flex justify-center items-center"
          >
            <span>Cập Nhật</span>
          </button>
        </div>
        <button
          onClick={handleCloseModal}
          className="absolute text-lg hover:text-bgPrimary p-3 z-[300] text-secondary close-modal-quickview -top-1  right-1 "
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>,
    document.querySelector("body") as HTMLElement
  );
}
