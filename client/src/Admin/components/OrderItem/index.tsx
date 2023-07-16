import * as React from "react";
import Image from "next/image";
import { IMG_SRC } from "@/common/constanst";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { IOrder } from "@/types/interface";
import formatVnd from "@/utils/formatVnd";
import Link from "next/link";
export interface IOderItemProps {
  item: IOrder;
}

export default function OrderItem({ item }: IOderItemProps) {
  const {
    fullName,
    address,
    createdAt,
    phoneNumber,
    email,
    products,
    totalAmount,
    totalPrice,
    status,
    id,
  } = item;
  return (
    <tr className="bg-gray-700 mt-2">
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        <Image
          src={IMG_SRC.avatar}
          className="h-12 w-12 object-cover bg-white rounded-full border"
          alt="..."
        />
        <span className="ml-3 font-bold text-white">{fullName}</span>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {phoneNumber}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <div className="w-52">
          <Tippy content={address ? address : ""}>
            <p className=" overflow-hidden whitespace-nowrap text-ellipsis select-none">
              {address}
            </p>
          </Tippy>
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <button className="py-3 px-5 bg-orange-500 rounded-[5px]">
          Đang xử lý
        </button>
        {/* {status === "PENDING" && (
          <button className="py-3 px-5 bg-orange-500 rounded-[5px]">
            Đang xử lý
          </button>
        )}
        {status === "CANCELED" && (
          <button className="py-3 px-5 bg-red-500 rounded-[5px]">Đã hủy</button>
        )}
        {status === "DELIVERING" && (
          <button className="py-3 px-5 bg-saveBg rounded-[5px]">
            Đang vận chuyển
          </button>
        )} */}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {formatVnd(totalPrice.toString())} VND
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex">
          <Link
            href={{
              pathname: "/admin/orders/[id]",
              query: {
                id: id,
              },
            }}
            className="bg-pink-700 rounded-[10px] px-3 py-[2px] cursor-pointer"
          >
            👁️‍🗨️
          </Link>
        </div>
      </td>
    </tr>
  );
}
