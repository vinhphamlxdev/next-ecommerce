import * as React from "react";
import { styled } from "styled-components";
import { IProduct } from "@/types/interface";
import Quantity from "../Quantity";
import notification from "@/utils/notification";
import Button from "../Button";
import formatVnd from "@/utils/formatVnd";
import handleAddToCart from "@/utils/handleAddToCart";
import { useCartStore } from "@/store/cartStore";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/store/modalStore";
export interface IProductDetailProps {
  item: IProduct;
  isQuickView: boolean;
}

export default function ProductDetail({
  item,
  isQuickView,
}: IProductDetailProps) {
  const {
    imageUrls,
    name,
    shortDescription,
    quantity: amount,
    sizes,
    price,
    category,
  } = item;
  const [imgPreview, setImgPreview] = React.useState<string>(imageUrls[0]);
  const handlePreviewProduct = (url: string) => setImgPreview(url);
  const [quantity, setQuantity] = React.useState<number>(1);
  const { addToCart } = useCartStore((state) => state);
  const { setCloseModalQuickView } = useModalStore((state) => state);
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
      <div className="flex flex-1 flex-col gap-y-4">
        <h3 className="text-3xl pr-9 font-semibold text-secondary">
          {item.name}
        </h3>
        <div className="flex gap-x-3">
          <span className="text-lg font-medium text-bgPrimary">
            {formatVnd(item.price.toString())}₫
          </span>
        </div>

        <span className="text-base text-textPrimary">{shortDescription}</span>

        <div className="flex items-center font-normal cursor-pointer text-secondary hover:text-bgPrimary gap-x-3">
          <i className=" leading-[0px] text-inherit bi-heart"></i>
          Thêm Vào Danh Sách Yêu Thích
        </div>
        {isQuickView ? (
          <></>
        ) : (
          <div className="relative">
            <Button
              onClick={() => handleAddToCart(item, quantity, addToCart)}
              className="btn-add-to-cart"
            >
              Mua Ngay
            </Button>
          </div>
        )}

        <div className="flex items-center gap-x-2">
          <span className="text-lg font-semibold text-secondary">
            Danh mục:
          </span>
          <span className="text-base uppercase font-normal text-gray-500">
            {category?.name}
          </span>
        </div>
        <div className="flex gap-x-3">
          <Quantity
            onChange={handleQuantityChange}
            handleDec={handleDec}
            handleInc={handleInc}
            value={quantity}
          />
          <Button
            onClick={() => {
              handleAddToCart(item, quantity, addToCart);
              setCloseModalQuickView();
            }}
            className="btn-add-to-cart"
          >
            Thêm Vào Giỏ Hàng
          </Button>
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
