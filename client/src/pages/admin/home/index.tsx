import LayoutAdmin from "@/Admin/components/layout";
import BestSeller from "@/components/BestSeller";
import { getAllProducts } from "@/service/ProductApi";
import { IProduct } from "@/types/interface";
import formatVnd from "@/utils/formatVnd";
import * as React from "react";
import { AiOutlineMoneyCollect, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiBarChart } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
import { toast } from "react-toastify";
import { GiChart, GiMoneyStack } from "react-icons/gi";
import { MdShowChart } from "react-icons/md";
import { BsPieChart } from "react-icons/bs";
import { IoStatsChartOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";

export interface IHomeAdminProps {}

export default function HomeAdmin(props: IHomeAdminProps) {
  return (
    <LayoutAdmin>
      <div className="mt-5 dashboard-layout">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div className="p-3 rounded-md flex gap-x-3 bg-white shadow-md">
            <div className="icon-customer w-10 h-10 bg-[#9b5de5] rounded-full flex justify-center items-center">
              <AiOutlineUsergroupAdd className="text-white text-base"></AiOutlineUsergroupAdd>
            </div>
            <div className="flex justify-between flex-1 ">
              <div className="flex gap-y-5  flex-col">
                <div className="flex flex-col ">
                  <span className="text-sm  text-gray-500">
                    Tổng Số Khách Hàng
                  </span>
                  <span className="text-2xl font-medium">1,02,890</span>
                </div>
                <div
                  onClick={() => toast.warning("Tính năng chưa cập nhật")}
                  className="flex gap-x-2 cursor-pointer items-center text-[#9b5de5]"
                >
                  <span>Xem tất cả</span>
                  <i className="bi text-lg bi-arrow-right"></i>
                </div>
              </div>
              <div className="flex flex-col">
                <FiBarChart className="text-[100px] text-[#9b5de5]"></FiBarChart>
                <div className="flex  gap-x-3">
                  <span className="text-base text-saveBg">+40%</span>
                  <span className="text-gray-400 text-sm">Trong tháng này</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-md flex gap-x-3 bg-white shadow-md">
            <div className="icon-customer w-10 h-10 bg-[#00bbf9] rounded-full flex justify-center items-center">
              <GiMoneyStack className="text-white text-base"></GiMoneyStack>
            </div>
            <div className="flex justify-between flex-1 ">
              <div className="flex gap-y-5  flex-col">
                <div className="flex flex-col ">
                  <span className="text-sm  text-gray-500">Tổng Doanh Thu</span>
                  <span className="text-2xl font-medium">295,535,000 VND</span>
                </div>
                <div
                  onClick={() => toast.warning("Tính năng chưa cập nhật")}
                  className="flex gap-x-2 cursor-pointer items-center text-[#00bbf9]"
                >
                  <span>Xem tất cả</span>
                  <i className="bi text-lg bi-arrow-right"></i>
                </div>
              </div>
              <div className="flex flex-col">
                <IoStatsChartOutline className="text-[100px] text-[#00bbf9]"></IoStatsChartOutline>
                <div className="flex  gap-x-3">
                  <span className="text-base text-saveBg">+64%</span>
                  <span className="text-gray-400 text-sm">Trong tháng này</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-md flex gap-x-3 bg-white shadow-md">
            <div className="icon-customer w-10 h-10 bg-[#2ec4b6] rounded-full flex justify-center items-center">
              <BiMoneyWithdraw className="text-white text-base"></BiMoneyWithdraw>
            </div>
            <div className="flex justify-between flex-1 ">
              <div className="flex gap-y-5  flex-col">
                <div className="flex flex-col ">
                  <span className="text-sm  text-gray-500">
                    Số Hóa Đơn Đang Chờ Xử Lý
                  </span>
                  <span className="text-2xl font-medium">654,365</span>
                </div>
                <div
                  onClick={() => toast.warning("Tính năng chưa cập nhật")}
                  className="flex gap-x-2 cursor-pointer items-center text-[#2ec4b6]"
                >
                  <span>Xem tất cả</span>
                  <i className="bi text-lg bi-arrow-right"></i>
                </div>
              </div>
              <div className="flex flex-col">
                <MdShowChart className="text-[100px] text-[#2ec4b6]"></MdShowChart>
                <div className="flex  gap-x-3">
                  <span className="text-base text-saveBg">+83%</span>
                  <span className="text-gray-400 text-sm">Trong tháng này</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-md flex gap-x-3 bg-white shadow-md">
            <div className="icon-customer w-10 h-10 bg-[#fb6f92] rounded-full flex justify-center items-center">
              <AiOutlineMoneyCollect className="text-white text-base"></AiOutlineMoneyCollect>
            </div>
            <div className="flex justify-between flex-1 ">
              <div className="flex gap-y-5  flex-col">
                <div className="flex flex-col ">
                  <span className="text-sm  text-gray-500">
                    Số Hóa Đơn Đang Vận Chuyển
                  </span>
                  <span className="text-2xl font-medium">312,965</span>
                </div>
                <div
                  onClick={() => toast.warning("Tính năng chưa cập nhật")}
                  className="flex gap-x-2 cursor-pointer items-center text-[#fb6f92]"
                >
                  <span>Xem tất cả</span>
                  <i className="bi text-lg bi-arrow-right"></i>
                </div>
              </div>
              <div className="flex flex-col">
                <GiChart className="text-[100px] text-[#fb6f92]"></GiChart>
                <div className="flex  gap-x-3">
                  <span className="text-base text-saveBg">+45%</span>
                  <span className="text-gray-400 text-sm">Trong tháng này</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
