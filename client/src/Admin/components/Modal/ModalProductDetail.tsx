import { useModalStore } from "@/store/modalStore";
import * as React from "react";
import ReactDOM from "react-dom";
import InputModal from "../InputModal/InputModal";
import { IProduct } from "@/types/interface";
import Image from "next/image";
import UseDisabled from "@/hooks/useDisabled";
import { btnColorStyle } from "../ChooseColor";

export interface IModalProductDetailProps {
  data: IProduct;
}

export default function ModalProductDetail({ data }: IModalProductDetailProps) {
  const { category, sizes, colors } = data;
  const { isOpenDetailP, setOpenDetailProduct } = useModalStore();
  if (typeof document === "undefined")
    return <div className="modal_product-detail"></div>;
  return ReactDOM.createPortal(
    <div
      className={`modal__product-detail flex w-full h-full inset-0 fixed z-[500] ${
        isOpenDetailP ? "" : "hidden"
      }`}
    >
      <div
        onClick={() => setOpenDetailProduct(false)}
        className="absolute inset-0 z-20 bg-black opacity-60 overlay "
      ></div>
      <div className="p-3 max-h-[550px] has-scrollbar rounded-md relative bg-white w-[550px]  inset-0 m-auto z-[600]">
        <div className="flex gap-y-3 flex-col">
          <div className="modal-choose-category">
            <div className="text-base mb-3 font-medium">Danh mục</div>
            <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
              <div className="text-base capitalize">{category?.name}</div>
            </div>
          </div>
          <div className="size-detail flex flex-col gap-y-3">
            <div className="text-base  font-medium">Size</div>
            <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
              {sizes.length > 0 &&
                sizes.map((sizeName: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="text-white w-14 flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light bg-saveBg text-xs"
                    >
                      <span>{sizeName}</span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="size-detail flex flex-col gap-y-3">
            <div className="text-base  font-medium">Màu sắc</div>
            <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
              {colors.length > 0 &&
                colors.map((colorName: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`${btnColorStyle} ${
                        colorName === "Đen"
                          ? "bg-[#293241]"
                          : colorName === "Trắng"
                          ? "bg-[#adb5bd] text-black"
                          : colorName === "Xanh Lá"
                          ? "bg-saveBg"
                          : colorName === "Xanh Da Trời"
                          ? "bg-[#4cc9f0]"
                          : ""
                      } `}
                    >
                      <span>{colorName}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-3">
            <InputModal
              disabled={true}
              title="Tên sản phẩm"
              id="name"
              value={data?.name}
            />
            <InputModal
              disabled={true}
              id="price"
              title="Giá"
              value={data?.price.toString()}
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
            {data?.imageUrls?.map((img, index) => {
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
          onClick={() => setOpenDetailProduct(false)}
          className="absolute text-lg hover:text-bgPrimary p-3 z-[300] text-secondary close-modal-quickview -top-1  right-1 "
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>,
    document.querySelector("body") as HTMLElement
  );
}
