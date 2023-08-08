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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "../NextArrow";
import PrevArrow from "../PreArrow";
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
    discount,
  } = item;

  const [imgPreview, setImgPreview] = React.useState<string>(imageUrls[0]);
  const [quantity, setQuantity] = React.useState<number>(1);
  const { dispatch, state } = useCartContext();
  const { setCloseModalQuickView } = useModalStore((state) => state);
  const [selectedSize, setSelectedSize] = React.useState<string>(
    sizes[0]?.name
  );
  const [selectedColor, setSelectedColor] = React.useState<string>(
    colors[0]?.colorName
  );
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);

  let slickProperty = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
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
  const handleChooseColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedColor(value);
  };
  const handlePreviewProduct = (url: string) => setImgPreview(url);
  return (
    <StyledProductDetailItem className="flex  gap-x-5">
      <div className="flex w-[420px] p-3 flex-col gap-y-5">
        <div className="product-detail-image h-[380px] border border-[#ebebeb]">
          {imageUrls && imageUrls ? (
            <img className="rounded-md  object-cover" src={imgPreview} alt="" />
          ) : (
            <></>
          )}
        </div>
        <div className="w-full gap-x-7">
          <Slider {...slickProperty}>
            {imageUrls &&
              imageUrls.length > 0 &&
              imageUrls.map((imgUrl, index) => {
                return (
                  <div
                    onClick={() => handlePreviewProduct(imgUrl)}
                    key={index}
                    className={`relative px-1 py-2 image-preview border cursor-pointer border-[#ebebeb] ${
                      imgUrl === imgPreview ? "active" : ""
                    }`}
                  >
                    <img className="img-elm" src={imgUrl} alt="" />
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-y-4 p-3">
        <h3 className="text-3xl uppercase  product-detail__name pr-9 font-semibold">
          {item.name}
        </h3>
        <div className="flex gap-x-3">
          {discount?.discountPrice > 0 ? (
            <div className="flex gap-x-3 items-center">
              <span className="text-3xl product-detail__price  text-gray-600 font-semibold">
                {formatVnd(discount?.discountPrice.toString())}₫
              </span>
              <span className="line-through text-xl  font-normal text-[#acacac]">
                {formatVnd(discount?.originalPrice.toString())}₫
              </span>
            </div>
          ) : (
            <span className="text-3xl product-detail__price  text-gray-600 font-semibold">
              {formatVnd(item.price.toString())}₫
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <span className="text-base text-[#707070] font-medium">Màu Sắc:</span>
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
                      id={`swatch-detail-${color.colorName}`}
                      type="radio"
                      name="color-option-detail"
                      value={color.colorName}
                      onChange={handleChooseColor}
                      checked={selectedColor === color.colorName}
                    />
                    <Tippy content={`${color.colorName}`}>
                      <label
                        className={`color-label cursor-pointer flex justify-center items-center w-7 h-7 rounded-full  select-none  border 
                        ${getColorClassName(color.colorName)}
                        `}
                        htmlFor={`swatch-detail-${color.colorName}`}
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
