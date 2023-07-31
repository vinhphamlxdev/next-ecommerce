import * as React from "react";
import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import { IProduct } from "@/types/interface";
import calculateTotalPrice from "@/utils/calculateTotalPrice";
import formatVnd from "@/utils/formatVnd";
import Link from "next/link";
import dynamic from "next/dynamic";
import Breadcrumb from "@/components/Breadcrumb";
import { useCartContext } from "@/context/useCartContext";

const LayoutClient = dynamic(() => import("@/components/layout/LayoutMain"), {
  ssr: false,
});

export default function Cart() {
  const { dispatch, state } = useCartContext();
  const cartItems = state.cartItems;
  console.log(cartItems);

  return (
    <LayoutClient>
      <Breadcrumb titlePage="Giỏ hàng" />
      <div className="cart-page my-10">
        <div className="wrapper-layout">
          <div className="text-xl font-medium">Giỏ hàng của bạn</div>
          <div className="flex flex-col">
            <div className="cart-list-container">
              <div className="flex border-b border-gray-300 items-center py-2 ">
                <div className="w-5/12 text-base font-medium text-center text-secondary">
                  Sản Phẩm
                </div>
                <div className="grid w-full grid-cols-4 gap-x-3">
                  <div className="text-base font-medium text-center text-secondary">
                    Đơn Giá
                  </div>
                  <div className="text-base font-medium text-center text-secondary">
                    Số Lượng
                  </div>
                  <div className="text-base font-medium text-center text-secondary">
                    Thành Tiền
                  </div>
                  <div className="text-base font-medium text-center text-secondary">
                    Xóa
                  </div>
                </div>
              </div>
              {cartItems.length > 0 ? (
                cartItems.map((item: IProduct, index: number) => {
                  return <CartItem key={index} item={item} />;
                })
              ) : (
                <div className="my-3 text-2xl font-semibold text-center text-textPrimary">
                  Không có sản phẩm trong giỏ hàng
                </div>
              )}
            </div>
            <div className="flex justify-between mt-7">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center font-semibold gap-x-3 text-secondary">
                  Tổng tiền:
                  <span className="text-base font-medium text-bgPrimary">
                    {formatVnd(calculateTotalPrice(cartItems).toString())}₫
                  </span>
                </div>
                <Link
                  href="/products"
                  className="text-base bg-[#f2f2f2] px-4 py-3 text-gray-700 font-bold hover:text-white hover:bg-blue-500 transition-all"
                >
                  <i className="bi bi-arrow-left"></i>
                  <span> TIẾP TỤC MUA HÀNG</span>
                </Link>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="text-base italic font-light text-gray-400">
                  Vận chuyển và thuế được tính khi thanh toán
                </span>
                <Link
                  href="/checkout"
                  className="bg-bgPrimary px-4 py-3 transition-all text-white font-bold hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                  THANH TOÁN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutClient>
  );
}
