import { useCartContext } from "@/context/useCartContext";
import { IProduct } from "@/types/interface";
import formatVnd from "@/utils/formatVnd";
import * as React from "react";

export interface ICartItemProps {
  item: IProduct;
}

export default function CartItem({ item }: ICartItemProps) {
  const { dispatch } = useCartContext();
  const {
    id,
    colors,
    name,
    imageUrls,
    price,
    shortDescription,
    quantity,
    sizes,
    discount,
  } = item;
  const updateQuantity = (type: string, product: IProduct) => {
    dispatch({ type: "SET_QUANTITY", payload: { type, product } });
  };
  const handleDeleteCartItem = (newProduct: IProduct) => {
    dispatch({ type: "DELETE_CART", payload: newProduct });
  };
  return (
    <div className=" flex py-3 border-t-0 border-b border-gray-300 cart-row">
      <div className="flex w-5/12 gap-x-1">
        <div className="relative flex-shrink-0 flex items-center cursor-pointer">
          <img className="rounded-md w-28" src={imageUrls[0]} alt="" />
        </div>
        <div className="flex flex-col gap-y-2 items-start justify-center p-2">
          <h5 className="text-base font-semibold transition-all duration-500 cursor-pointer text-secondary whitespace-nowrap hover:text-primary">
            {name}
          </h5>
          <div className="flex gap-x-2 items-center">
            <span>{sizes[0]?.name}</span>
            <span>{colors[0]?.colorName}</span>
          </div>
          <span></span>
        </div>
      </div>
      <div className="grid w-full  gap-x-3 grid-cols-4">
        {discount?.discountPrice > 0 ? (
          <div className="flex items-center justify-center text-base font-semibold flex-center text-secondary">
            {formatVnd(discount?.discountPrice.toString())}₫
          </div>
        ) : (
          <div className="flex items-center justify-center text-base font-semibold flex-center text-secondary">
            {formatVnd(discount?.originalPrice.toString())}₫
          </div>
        )}

        <div className="flex items-center justify-center">
          <div
            onClick={() => updateQuantity("-", item)}
            className="select-none btn-decrease"
          >
            -
          </div>
          <div className="cart-quantity">{quantity}</div>
          <div
            onClick={() => updateQuantity("+", item)}
            className="select-none btn-increase"
          >
            +
          </div>
        </div>
        <div className="flex items-center justify-center text-base font-semibold text-secondary">
          {discount?.discountPrice > 0 ? (
            <span>
              {formatVnd((discount?.discountPrice * quantity).toString())}₫
            </span>
          ) : (
            <span>
              {formatVnd((discount?.originalPrice * quantity).toString())}₫
            </span>
          )}
        </div>
        <div
          onClick={() => handleDeleteCartItem(item)}
          className="flex justify-center items-center"
        >
          <i className="text-xl font-semibold transition-all duration-500 cursor-pointer select-none text-bgPrimary bi bi-trash" />
        </div>
      </div>
    </div>
  );
}
