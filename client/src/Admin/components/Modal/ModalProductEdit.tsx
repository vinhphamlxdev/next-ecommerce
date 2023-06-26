import { useModalStore } from "@/store/modalStore";
import * as React from "react";
import ReactDOM from "react-dom";
import Select from "../Select";
import InputModal from "../InputModal/InputModal";
import axios from "axios";
import { toast } from "react-toastify";
import { ICategory, IProduct } from "@/types/interface";
import * as Yup from "yup";
import { useFormik } from "formik";
import UseDisabled from "@/hooks/useDisabled";
import SelectImage from "../SelectImage";
import LoadingButton from "../Loading/LoadingButton";
import { LoadingSpinner } from "../Loading";

export interface IModalProductEditProps {
  data: IProduct | any;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalProductEdit({
  data,
  setRender,
}: IModalProductEditProps) {
  const [optionCategorys, setOptionCategory] = React.useState<
    ICategory[] | any
  >([]);
  const { isOpenEditP, setOpenEditProduct, isLoading, setLoading } =
    useModalStore((state) => state);
  const [imgs, setImgs] = React.useState<any>([]);
  const [files, setFile] = React.useState<File[]>([]);
  const [imgsDelete, setImgsDelete] = React.useState<string[] | any>([]);
  const productEditFormik = useFormik({
    initialValues: {
      name: data?.name,
      description: data?.description,
      price: data?.price,
      quantity: data?.quantity,
    },
    onSubmit: async (values: any) => {
      // Handle form submission
    },
    enableReinitialize: true,
  });

  const handleSubmitEditProduct = async (id: number) => {
    const { name, price, description, quantity } = productEditFormik.values;
    if (!optionCategorys || optionCategorys.length === 0) {
      toast.error("Vui lòng chọn danh mục sản phẩm");
      return;
    }
    if (!imgs || !imgs.length) {
      toast.error("Vui lòng chọn ảnh sản phẩm");
      return;
    }

    const categoryIds = optionCategorys.map((c: ICategory) => c.id);
    const newFormData = new FormData();
    newFormData.append("name", name);
    newFormData.append("description", description);
    newFormData.append("price", price);
    newFormData.append("quantity", quantity);
    newFormData.append("categories", categoryIds);
    for (let index = 0; index < files.length; index++) {
      newFormData.append(`images[${index}]`, files[index]);
    }
    newFormData.append("imgsDelete", imgsDelete);
    const response = await axios.put(
      `http://localhost:8080/products/${id}`,
      newFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
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
    }
  };
  React.useEffect(() => {
    if (!data) {
      return;
    }
    setOptionCategory(data?.categorys);
    setImgs(data?.imageUrls);
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
          <div className="modal-choose-category">
            <div className="text-base mb-3 font-medium">Category</div>
            <Select
              id="selectOption"
              label=""
              select={optionCategorys}
              setSelect={setOptionCategory}
            />
          </div>
          <div className="grid grid-cols-3 gap-x-3">
            <InputModal
              disabled={false}
              change={true}
              title="Name"
              id="name"
              setData={productEditFormik.handleChange}
              value={productEditFormik.values.name || ""}
            />
            <InputModal
              disabled={false}
              change={true}
              id="price"
              setData={productEditFormik.handleChange}
              title="Price"
              value={productEditFormik.values.price ?? ""}
            />
            <InputModal
              disabled={false}
              change={true}
              id="quantity"
              setData={productEditFormik.handleChange}
              title="Quantity"
              value={productEditFormik.values.quantity ?? ""}
            />
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
            <span>Save</span>
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
