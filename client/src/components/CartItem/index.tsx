import { useCartStore } from "@/store/cartStore";
import { IProduct } from "@/types/interface";
import formatVnd from "@/utils/formatVnd";
import * as React from "react";

export interface ICartItemProps {
  item: IProduct;
}

export default function CartItem({ item }: ICartItemProps) {
  const {
    id,
    colors,
    name,
    imageUrls,
    price,
    shortDescription,
    quantity,
    sizes,
  } = item;
  const { setQuantityCart, deleteFromCart } = useCartStore((state) => state);
  const updateQuantity = (type: any) => {
    setQuantityCart({ id, type });
  };
  const handleDeleteCartItem = (productId: number) => {
    deleteFromCart(productId);
  };
  return (
    <div className=" flex py-3 border-t-0 border-b border-gray-300 cart-row">
      <div className="flex w-5/12 gap-x-1">
        <div className="relative flex-shrink-0 flex items-center cursor-pointer">
          <img className="rounded-md w-28" src={imageUrls[0]} alt="" />
        </div>
        <div className="flex flex-col items-start justify-center p-2">
          <h5 className="text-base font-semibold transition-all duration-500 cursor-pointer text-secondary whitespace-nowrap hover:text-primary">
            {name}
          </h5>
          <span></span>
        </div>
      </div>
      <div className="grid w-full  gap-x-3 grid-cols-4">
        <div className="flex items-center justify-center text-base font-semibold flex-center text-secondary">
          {formatVnd(price.toString())}
        </div>
        <div className="flex items-center justify-center">
          <div
            onClick={() => updateQuantity("-")}
            className="select-none btn-decrease"
          >
            -
          </div>
          <div className="cart-quantity">{quantity}</div>
          <div
            onClick={() => updateQuantity("+")}
            className="select-none btn-increase"
          >
            +
          </div>
        </div>
        <div className="flex items-center justify-center text-base font-semibold text-secondary">
          <span>{formatVnd((price * quantity).toString())}</span>
        </div>
        <div
          onClick={() => handleDeleteCartItem(id)}
          className="flex justify-center items-center"
        >
          <i className="text-xl font-semibold transition-all duration-500 cursor-pointer select-none text-bgPrimary bi bi-trash" />
        </div>
      </div>
    </div>
  );
}
