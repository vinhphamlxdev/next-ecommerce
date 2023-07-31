import * as React from "react";
import { styled } from "styled-components";
import { IProduct } from "@/types/interface";
import Quantity from "../Quantity";
import notification from "@/utils/notification";
import Button from "../Button";
import formatVnd from "@/utils/formatVnd";
import handleAddToCart from "@/utils/handleAddToCart";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/store/modalStore";
import getColorClassName from "@/utils/getColorClassName";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Image from "next/image";
import { toast } from "react-toastify";
import { CartContextProvider, useCartContext } from "@/context/useCartContext";
export interface IProductDetailProps {
  item: IProduct;
  className?: string;
}

export default function ProductDetail({
  item,
  className,
}: IProductDetailProps) {
  const {
    imageUrls,
    name,
    shortDescription,
    quantity: amount,
    sizes,
    price,
    category,
    colors,
  } = item;
  const [imgPreview, setImgPreview] = React.useState<string>(imageUrls[0]);
  const handlePreviewProduct = (url: string) => setImgPreview(url);
  const [quantity, setQuantity] = React.useState<number>(1);
  const { dispatch, state } = useCartContext();
  const { setCloseModalQuickView } = useModalStore((state) => state);
  const [selectedSize, setSelectedSize] = React.useState<string>(
    sizes[0]?.name
  );
  const [selectedColor, setSelectedColor] = React.useState<string>(
    colors[0]?.colorName
  );
  const handleInc = () => {
    setQuantity(quantity + 1);
  };
  const handleDec = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (+value < 1) {
      setQuantity(1);
    } else {
      setQuantity(+value);
    }
  };
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedSize(value);
  };
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedColor(value);
  };
  return (
    <StyledProductDetailItem className="flex  gap-x-5">
      <div className="flex w-[420px] p-3 flex-col gap-y-5">
        <div className="product-detail-image h-[380px] border border-[#ebebeb]">
          {imageUrls && imageUrls ? (
            <img className="rounded-md object-cover" src={imgPreview} alt="" />
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-3 gap-x-7">
          {imageUrls &&
            imageUrls.length > 0 &&
            imageUrls
              .filter((item, index) => index < 3)
              .map((image, index) => {
                return (
                  <div
                    onClick={() => handlePreviewProduct(image)}
                    key={index}
                    className={`relative image-preview border cursor-pointer border-gray-400 ${
                      image === imgPreview ? "active" : ""
                    }`}
                  >
                    <img src={image} alt="" />
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-y-4 p-3">
        <h3 className="text-xl product-detail__name pr-9 font-semibold">
          {item.name}
        </h3>
        <div className="flex gap-x-3">
          <span className="text-lg product-detail__price  text-gray-600 font-semibold">
            {formatVnd(item.price.toString())}₫
          </span>
        </div>
        <div className="flex flex-col gap-y-3">
          <span className="text-lg font-medium">Màu Sắc:</span>
          <div className="flex items-center gap-x-2">
            {colors?.length > 0 &&
              colors.map((color) => {
                return (
                  <div
                    key={color.id}
                    data-value={color.colorName}
                    className={`swatch-element w-9 h-9 rounded-full border  flex justify-center items-center ${
                      selectedColor === color.colorName ? "border-gray-600" : ""
                    }`}
                  >
                    <input
                      className="hidden"
                      id={`swatch-${color.colorName}`}
                      type="radio"
                      name="color-option"
                      value={color.colorName}
                      onChange={handleColorChange}
                      checked={selectedColor === color.colorName}
                    />
                    <Tippy content={`${color.colorName}`}>
                      <label
                        className={`color-label cursor-pointer flex justify-center items-center w-7 h-7 rounded-full  select-none  border 
                        ${getColorClassName(color.colorName)}
                        `}
                        htmlFor={`swatch-${color.colorName}`}
                      ></label>
                    </Tippy>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <span className="text-base text-[#707070] font-medium">
            Kích thước:
          </span>
          <div className="flex items-center gap-x-3">
            {sizes?.length > 0 &&
              sizes.map((size) => {
                return (
                  <div
                    key={size.id}
                    data-value={size.name}
                    className="swatch-element"
                  >
                    <input
                      className="hidden"
                      id={`swatch-${size.name}`}
                      type="radio"
                      name="size-option"
                      value={size.name}
                      onChange={handleSizeChange}
                      checked={selectedSize === size.name}
                    />
                    <label
                      className={`size-label cursor-pointer flex justify-center items-center w-8 h-8  select-none  border  ${
                        selectedSize === size.name
                          ? "bg-bgPrimary border-bgPrimary text-white"
                          : "text-bgPrimary  bg-white   border-gray-400"
                      }`}
                      htmlFor={`swatch-${size.name}`}
                    >
                      {size.name}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-base text-[#707070] font-medium">
            Số lượng:
          </span>
          <div className="flex gap-x-3">
            <Quantity
              onChange={handleQuantityChange}
              handleDec={handleDec}
              handleInc={handleInc}
              value={quantity}
            />
            <Button
              onClick={() => {
                handleAddToCart(
                  item,
                  quantity,
                  selectedSize,
                  selectedColor,
                  dispatch
                );
                setCloseModalQuickView();
              }}
              className="btn-add-to-cart"
            >
              Thêm Vào Giỏ Hàng
            </Button>
          </div>
        </div>
      </div>
    </StyledProductDetailItem>
  );
}
const StyledProductDetailItem = styled.div`
  .btn-add-to-cart {
    border: 0;
    background-color: #f51c1c;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #121a25;
    }
  }
  .image-preview.active {
    border: 1px solid #f51c1c;
  }
`;
