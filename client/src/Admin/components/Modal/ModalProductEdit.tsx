import { useModalStore } from "@/store/modalStore";
import * as React from "react";
import ReactDOM from "react-dom";
import Select from "../Select";
import InputModal from "../InputModal/InputModal";
import axios from "axios";
import { toast } from "react-toastify";
import { ICategory, IColor, IProduct, ISize } from "@/types/interface";
import * as Yup from "yup";
import { useFormik } from "formik";
import UseDisabled from "@/hooks/useDisabled";
import SelectImage from "../SelectImage";
import LoadingButton from "../Loading/LoadingButton";
import { LoadingSpinner } from "../Loading";
import ChooseSize from "../ChooseSize";
import ChooseColor from "../ChooseColor";

export interface IModalProductEditProps {
  data: IProduct;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalProductEdit({
  data,
  setRender,
}: IModalProductEditProps) {
  const { isOpenEditP, setOpenEditProduct, isLoading, setLoading } =
    useModalStore((state) => state);
  const [selectCategory, setCategory] = React.useState<ICategory[] | any>([]);
  const [sizes, setSizes] = React.useState<ISize[]>([]);
  const [colors, setColors] = React.useState<IColor[]>([]);
  const [imgs, setImgs] = React.useState<any>([]);
  const [files, setFile] = React.useState<File[]>([]);
  const [imgsDelete, setImgsDelete] = React.useState<string[] | any>([]);
  const [sizesDelete, setSizesDelete] = React.useState<number[] | any>([]);
  const [colorsDelete, setColorsDelete] = React.useState<number[] | any>([]);
  const productEditFormik = useFormik({
    initialValues: {
      name: data?.name,
      shortDescription: data?.shortDescription,
      price: data?.price,
      quantity: data?.quantity,
    },
    onSubmit: async (values: any) => {
      // Handle form submission
    },
    enableReinitialize: true,
  });

  const handleSubmitEditProduct = async (id: number) => {
    const { name, price, shortDescription, quantity } =
      productEditFormik.values;

    if (!selectCategory || selectCategory.length === 0) {
      toast.error("Vui lòng chọn danh mục sản phẩm");
      return;
    }
    if (price < 0) {
      toast.error("Giá không hợp lệ");
      return;
    }
    if (quantity < 0) {
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
    if (!colors || !colors.length) {
      toast.error("Vui lòng chọn màu sản phẩm");
      return;
    }

    const newFormData = new FormData();
    newFormData.append("name", name);
    newFormData.append("shortDescription", shortDescription);
    newFormData.append("price", price);
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
    const response = await axios.put(
      `http://localhost:8080/products/${id}`,
      newFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      toast.success("Cập nhật sản phẩm thành công");
      setOpenEditProduct(false);
      setRender((prevR) => !prevR);
      setFile([]);
      setImgsDelete([]);
    } else {
      toast.error("Cập nhật sản phẩm thất bại");
      setFile([]);
      setImgsDelete([]);
      setOpenEditProduct(false);
      setSizesDelete([]);
      setColorsDelete([]);
    }
  };
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setCategory(data?.category);
    setImgs(data?.imageUrls);
    setSizes(data?.sizes);
    setColors(data?.colors);
  }, [data]);

  if (typeof document === "undefined")
    return <div className="modal_product-detail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`modal__product-detail flex w-full h-full inset-0 fixed z-[500] ${
        isOpenEditP ? "" : "hidden"
      }`}
    >
      <div
        onClick={() => setOpenEditProduct(false)}
        className="absolute inset-0 z-20 bg-black opacity-60 overlay "
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
              setDeleteSizes={setSizesDelete}
              sizesDelete={sizesDelete}
              id="sizes"
            />
            <ChooseColor
              colorsDelete={colorsDelete}
              setDeleteColors={setColorsDelete}
              colors={colors}
              setColors={setColors}
              id="colors"
            />
          </div>

          <div className="grid grid-cols-3 gap-x-3">
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
              title="Giá"
              value={productEditFormik.values.price ?? ""}
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
              name="description"
              id="description"
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
            onClick={() => handleSubmitEditProduct(data?.id)}
            className="add-category hover:opacity-80 transition-all bg-saveBg px-3 text-sm   py-2 rounded-md text-white gap-x-3 flex justify-center items-center"
          >
            <span>Cập Nhật</span>
          </button>
        </div>
        <button
          onClick={() => setOpenEditProduct(false)}
          className="absolute text-lg hover:text-bgPrimary p-3 z-[300] text-secondary close-modal-quickview -top-1  right-1 "
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>,
    document.querySelector("body") as HTMLElement
  );
}
