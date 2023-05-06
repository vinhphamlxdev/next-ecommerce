import * as React from "react";
import { BsEye } from "react-icons/bs";
import LayoutAdmin from "@/Admin/components/layout";
import { DeleteIcon, EditIcon } from "@/components/Icons/AppIcon";
import Image from "next/image";
import { IMG_SRC } from "@/common/constanst";

export interface ProductProps {}

export default function Products(props: ProductProps) {
  return (
    <LayoutAdmin>
      <div className="admin-product p-3 bg-white shadow-md rounded-md">
        <div className="bg-slate-800 py-3 px-3  rounded-sm flex flex-col gap-y-3">
          <div className="flex justify-between p-3 items-center">
            <span className="text-white text-lg font-medium">Product list</span>
            <button className="text-white font-normal text-sm bg-saveBg px-3 py-[6px] rounded-md">
              Add Product
            </button>
          </div>
          <table className="items-center border-spacing-y-2 text-white w-full bg-transparent border-separate ">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Name
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Price
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  InStock
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Edit
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Delete
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody className=" w-full ">
              <tr className="bg-gray-700 mt-2">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <Image
                    src={IMG_SRC.product}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt=""
                  />
                  <span className="ml-3 font-bold text-white">
                    Ghế ăn gỗ cao su tự nhiên moho oslo
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  1,290,005đ
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>
                  <span className="bg-saveBg rounded-[10px] px-3 py-[2px] block text-center overflow-hidden w-[50px]">
                    1000
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="py-3 px-5 bg-orange-400 rounded-[5px]">
                    <EditIcon />
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="py-3 px-5 bg-red-500 rounded-[5px]">
                    <DeleteIcon />
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <div className="bg-pink-700 rounded-[10px] px-3 py-[2px] cursor-pointer">
                      <BsEye className="leading-[0px]" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAdmin>
  );
}
