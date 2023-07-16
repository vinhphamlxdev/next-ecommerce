import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";
import { IProduct } from "@/types/interface";
import Image from "next/image";
import { useModalStore } from "@/store/modalStore";
import { toast } from "react-toastify";
import formatVnd from "@/utils/formatVnd";
import handleAddToCart from "@/utils/handleAddToCart";
import { useCartStore } from "@/store/cartStore";
export interface IProductItemProps {
  item: IProduct;
}

export default function ProductItem({ item }: IProductItemProps) {
  const { colors, sizes, name, quantity, shortDescription, imageUrls, price } =
    item;
  const { showModalQuickView, setShowModalQuickView, seletedProduct } =
    useModalStore((state) => state);
  const { addToCart } = useCartStore((state) => state);
  const handleShowModalQuickView = (product: IProduct) => {
    console.log(seletedProduct);
    setShowModalQuickView(product);
  };

  return (
    <StyledProductItem className={`product-item fex flex-col relative`}>
      <div className="relative product-thumbnail">
        <div className="relative flex justify-center h-[450px] flex-shrink-0 overflow-hidden cursor-pointer product-image">
          {item && item.imageUrls ? (
            <>
              <img
                className="transition-all h-[450px] duration-700 first-image"
                src={imageUrls[0]}
                alt=""
              />
              <img
                className="absolute h-[450px] inset-0 invisible transition-all duration-700 opacity-0 second-image"
                src={imageUrls[1]}
                alt=""
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center invisible transition-all duration-500 opacity-0 product-action gap-x-2">
          <Tippy content="Xem">
            <button
              onClick={() => handleShowModalQuickView(item)}
              className="z-20 flex items-center justify-center px-2 py-2 text-sm transition-all bg-white rounded-sm product-action-btn text-textPrimary hover:text-white hover:bg-bgPrimary"
            >
              <i className="bi leading-[0px] text-inherit bi-eye"></i>
            </button>
          </Tippy>
          <Tippy content="Thêm Vào Yêu Thích">
            <button
              onClick={() => toast.warning("Tính năng đang cập nhật")}
              className="z-20 flex items-center justify-center px-2 py-2 text-sm transition-all bg-white rounded-sm product-action-btn text-textPrimary hover:text-white hover:bg-bgPrimary"
            >
              <i className=" leading-[0px] text-inherit bi bi-heart-fill"></i>
            </button>
          </Tippy>
          <Tippy content="Thêm Vào Giỏ Hàng">
            <button
              onClick={() => handleAddToCart(item, 1, addToCart)}
              className="z-20 flex items-center justify-center px-2 py-2 text-sm transition-all bg-white rounded-sm product-action-btn text-textPrimary hover:text-white hover:bg-bgPrimary"
            >
              <i className="bi leading-[0px] text-inherit bi-cart-plus-fill"></i>
            </button>
          </Tippy>
        </div>
      </div>
      <div className="flex flex-col flex-1 items-center h-[calc(100%-250px)] p-3  border-t-0  cursor-default product-item-content ">
        <div className="flex flex-col items-center gap-y-2">
          <h3 className="text-base  font-semibold cursor-pointer hover:text-bgPrimary text-secondary">
            {name}
          </h3>
          <div className="flex items-center justify-center w-full product-item-price gap-x-3">
            <span className="text-lg font-medium text-bgPrimary">
              {formatVnd(price.toString())}
            </span>
          </div>
        </div>
      </div>
    </StyledProductItem>
  );
}
const StyledProductItem = styled.div`
  .image-second {
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  &:hover .product-thumbnail .product-image .first-image {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    opacity: 0;
    visibility: hidden;
  }

  &:hover .product-thumbnail .product-image .second-image {
    opacity: 1;
    visibility: visible;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
  &:hover .product-thumbnail .product-action {
    opacity: 1;
    visibility: visible;
    bottom: 12px;
  }
  &:hover .product-item-content .add-to-cart {
    opacity: 1;
    visibility: visible;
  }
`;
