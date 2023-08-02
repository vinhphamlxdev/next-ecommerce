import { useModalStore } from "@/store/modalStore";
import * as React from "react";
import ReactDOM from "react-dom";
import InputModal from "../InputModal/InputModal";
import { IColor, IProduct, ISize } from "@/types/interface";
import Image from "next/image";
import UseDisabled from "@/hooks/useDisabled";
import { btnColorStyle } from "../ChooseColor";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getProduct } from "@/pages/api/ProductApi";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../Loading";
import getColorClassName from "@/utils/getColorClassName";

export interface IModalProductDetailProps {
  productId: number | null;
  isOpenDetailP: boolean;
  setSelectedId: React.Dispatch<React.SetStateAction<any>>;
}

export default function ModalProductDetail({
  productId,
  isOpenDetailP,
  setSelectedId,
}: IModalProductDetailProps) {
  console.log(isOpenDetailP);
  const { setOpenDetailProduct } = useModalStore();
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    enabled: productId !== undefined,
    queryFn: () => getProduct(productId as number),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      toast.error("Có lỗi");
    },
  });
  const handleCloseModal = () => {
    setOpenDetailProduct(false);
    setSelectedId(null);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (typeof document === "undefined")
    return <div className="modal_product-detail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`modal__product-detail flex w-full h-full inset-0 fixed z-[500] ${
        isOpenDetailP ? "" : "hidden"
      }`}
    >
      <div
        onClick={handleCloseModal}
        className="absolute inset-0 z-20 bg-black opacity-20 overlay "
      ></div>
      <div className="p-3 max-h-[550px] has-scrollbar rounded-md relative bg-white w-[550px]  inset-0 m-auto z-[600]">
        <div className="flex gap-y-3 flex-col">
          <div className="modal-choose-category">
            <div className="text-base mb-3 font-medium">Danh mục</div>
            <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
              <div className="text-base capitalize">{data?.category?.name}</div>
            </div>
          </div>
          <div className="size-detail flex flex-col gap-y-3">
            <div className="text-base  font-medium">Size</div>
            <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
              {data?.sizes.length > 0 &&
                data?.sizes
                  .filter((size: ISize) => !size.delete)
                  .map((size: ISize, index: number) => {
                    return (
                      <div
                        key={index}
                        className="text-white w-14 flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light bg-saveBg text-xs"
                      >
                        <span>{size?.name}</span>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="size-detail flex flex-col gap-y-3">
            <div className="text-base  font-medium">Màu sắc</div>
            <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
              {data?.colors.length > 0 &&
                data?.colors
                  .filter((color: IColor) => !color.delete)
                  .map((color: IColor, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`${btnColorStyle} ${getColorClassName(
                          color.colorName
                        )} `}
                      >
                        <span>{color.colorName}</span>
                      </div>
                    );
                  })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-3">
            <InputModal
              disabled={true}
              title="Tên sản phẩm"
              id="name"
              value={data?.name}
            />
            <InputModal
              disabled={true}
              id="price"
              title="Giá gốc"
              value={data?.price.toString()}
            />
            <InputModal
              disabled={true}
              id="price"
              title="Giá giảm"
              value={data?.discount?.discountPrice?.toString()}
            />
            <InputModal
              disabled={true}
              id="quantity"
              title="Số lượng"
              value={data?.quantity.toString()}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="text-base font-medium">Mô tả</div>
            <div className="bg-[#f5f5f5] text-gray-500 h-14 p-3 flex gap-x-3">
              {data?.shortDescription}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-y-3 gap-x-3">
            {data?.imageUrls?.map((img: string, index: number) => {
              return (
                <Image
                  key={index}
                  className="object-cover"
                  width={200}
                  height={250}
                  src={img}
                  alt=""
                />
              );
            })}
          </div>
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
