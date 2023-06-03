import * as React from "react";
import LayoutAdmin from "@/Admin/components/layout";
import { IMG_SRC } from "@/common/constanst";
import Image from "next/image";
import userImg from "../../../../public/wall.jpg";
import { useGlobalStore } from "@/store/globalStore";
export interface OrdersProps {}

export default function AllOrder(props: OrdersProps) {
  const { isSticky, setBgHeader } = useGlobalStore((state) => state);
  console.log(isSticky);
  return (
    <LayoutAdmin>
      <div className="p-3 flex flex-col gap-y-3 rounded-sm bg-white shadow-md">
        <h3 className=" font-medium text-xl">All order</h3>
        <div className="bg-slate-800 py-3 px-3 rounded-sm flex flex-col gap-y-3">
          <div className="flex justify-between">
            <span className="text-white text-lg font-medium">Order list</span>
            <select
              className="p-1 bg-white w-28 outline-none rounded-sm"
              name=""
              id=""
            >
              <option value="1">All</option>
              <option value="2">Success</option>
              <option value="3">Pending</option>
            </select>
          </div>
          <table className="items-center border-spacing-y-2 text-white w-full bg-transparent border-separate ">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Cutstomer
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Phone number
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Recipient
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Status
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Total
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-700 mt-2">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <Image
                    src={IMG_SRC.logo}
                    className="h-12 w-12 object-cover bg-white rounded-full border"
                    alt="..."
                  />
                  <span className="ml-3 font-bold text-white ">Vinh pham</span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  0364216512
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <p className="w-52 overflow-hidden">
                    KTX KHU B ĐHQG TPHCM, Tỉnh Tiền Giang, Huyện Cái Bè
                  </p>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="py-3 px-5 bg-orange-500 rounded-[5px]">
                    Đang xử lý
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  11,990,000
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <button className="bg-pink-700 rounded-[10px] px-3 py-[2px] cursor-pointer">
                      👁️‍🗨️
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-700 mt-2">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <Image
                    src={IMG_SRC.logo}
                    className="h-12 w-12 object-cover bg-white rounded-full border"
                    alt=""
                  />
                  <span className="ml-3 font-bold text-white ">Vinh pham</span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  0364216512
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <p className="w-52 overflow-hidden">
                    KTX KHU B ĐHQG TPHCM, Tỉnh Tiền Giang, Huyện Cái Bè
                  </p>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="py-3 px-5 bg-orange-500 rounded-[5px]">
                    Đang xử lý
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  11,990,000
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <button className="bg-pink-700 rounded-[10px] px-3 py-[2px] cursor-pointer">
                      👁️‍🗨️
                    </button>
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
