import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";
import { IFilters, IProduct, IProductFilters } from "@/types/interface";
import Image from "next/image";
import { useModalStore } from "@/store/modalStore";
import { toast } from "react-toastify";
import formatVnd from "@/utils/formatVnd";
import handleAddToCart from "@/utils/handleAddToCart";
import Link from "next/link";
export interface IProductItemProps {
  item: IProduct;
}

export default function ProductItem({ item }: IProductItemProps) {
  const {
    colors,
    sizes,
    name,
    quantity,
    shortDescription,
    imageUrls,
    price,
    id,
    slug,
  } = item;
  const { showModalQuickView, setShowModalQuickView, seletedProduct } =
    useModalStore((state) => state);
  const handleShowModalQuickView = (product: IProduct) => {
    console.log(seletedProduct);
    setShowModalQuickView(product);
  };
  return (
    <StyledProductItem className={`product-item fex flex-col relative`}>
      <div className="relative product-thumbnail">
        <div className="relative flex justify-center flex-shrink-0 overflow-hidden cursor-pointer product-image">
          <div className="center-block product-action hidden  transition-all duration-500 justify-center w-full  z-50 gap-x-2">
            <Link
              href={`/products/${slug}`}
              className="text-white flex justify-center items-center whitespace-nowrap font-normal text-sm bg-bgPrimary hover:bg-blue-600 py-2 w-32 transition-all "
            >
              Tùy chọn
            </Link>
            <button
              onClick={() => handleShowModalQuickView(item)}
              className="text-white whitespace-nowrap font-normal text-sm bg-bgPrimary hover:bg-blue-600 py-2 w-32 transition-all "
            >
              Xem nhanh
            </button>
          </div>
          {item && item.imageUrls ? (
            <Link href={`/products/${slug}`}>
              <img
                className="transition-all h-[300] duration-700 first-image"
                src={imageUrls[0]}
                alt=""
              />
              <img
                className="absolute h-[300px] inset-0 invisible transition-all duration-700 opacity-0 second-image"
                src={imageUrls[1]}
                alt=""
              />
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start flex-1  h-[calc(100%-250px)] py-3  border-t-0  cursor-default product-item-content ">
        <div className="flex flex-col gap-y-2">
          <Link
            href={`products/${slug}`}
            className="text-base  uppercase font-normal cursor-pointer hover:text-blue-500 text-[#323c3f]"
          >
            {name}
          </Link>
          <div className="flex w-full product-item-price gap-x-3">
            <span className="text-lg font-semibold text-[#363636]">
              {formatVnd(price.toString())}₫
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
  &:hover .product-thumbnail .product-action-view {
    opacity: 1;
    visibility: visible;
    bottom: 12px;
  }
  &:hover .product-item-content .add-to-cart {
    opacity: 1;
    visibility: visible;
  }
`;
