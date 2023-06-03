import LayoutAdmin from "@/Admin/components/layout";
import { IMG_SRC } from "@/common/constanst";
import Image from "next/image";
import * as React from "react";

export interface IUserProps {}

export default function User(props: IUserProps) {
  return (
    <LayoutAdmin>
      <div className="admin-user p-3 flex flex-col gap-y-3 rounded-sm bg-white shadow-md">
        <h3 className="font-medium text-xl">All User</h3>
        <div className="bg-slate-800 py-3 px-3 rounded-sm flex flex-col gap-y-3">
          <h3 className="text-white text-lg font-medium">User list</h3>
          <table className="items-center border-spacing-y-2 text-white w-full bg-transparent border-separate ">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Name
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Email
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Role
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-700 mt-2">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <Image
                    src={IMG_SRC.logo}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  />
                  <span className="ml-3 font-bold text-white ">Vinh pham</span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <p aria-expanded="false">vinhpham@gmail.com</p>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="py-3 px-5 rounded-[5px] bg-activeBg">
                    CUSTOMER
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="py-3 px-5 rounded-[5px] bg-activeBg">
                    Active
                  </button>
                </td>
              </tr>
              <tr className="bg-gray-700 mt-2">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <Image
                    src={IMG_SRC.logo}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  />
                  <span className="ml-3 font-bold text-white ">Vinh pham</span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <p aria-expanded="false">vinhpham@gmail.com</p>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="py-3 px-5 rounded-[5px] bg-activeBg">
                    CUSTOMER
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="py-3 px-5 rounded-[5px] bg-activeBg">
                    Active
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAdmin>
  );
}
