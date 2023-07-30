import * as React from "react";
import LayoutAdmin from "@/Admin/components/layout";
import { IMG_SRC } from "@/common/constanst";
import Image from "next/image";
import userImg from "../../../../public/wall.jpg";
import { useGlobalStore } from "@/store/globalStore";
import { IOrder } from "@/types/interface";
import { getAllOrder } from "@/service/OrderApi";
import OrderItem from "@/Admin/components/OrderItem";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { LoadingSkeleton } from "@/Admin/components/Loading";
import PaginationComponent from "@/Admin/components/Pagination";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";

export default function AllOrder() {
  const initialPagination: PaginationState = {
    current: 1,
    totalPages: 3,
  };
  const initialFilters: FiltersState = {
    pageNum: 0,
    itemsPerPage: 3,
  };
  const { filters, handlePageChange, pagination, setFilters, setPagination } =
    usePaginationAndFilters(initialPagination, initialFilters);
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getAllOrder(filters),
    onSuccess: (data) => {
      console.log("Orders data:", data);
      const { page } = data;
      setPagination({
        current: page?.current,
        totalPages: page?.totalPages,
      });
    },
    onError: (err) => {
      console.log("err:", err);
    },
  });
  return (
    <LayoutAdmin>
      <div className="p-3 flex order-admin flex-col gap-y-3 rounded-sm bg-white shadow-md">
        <h3 className=" font-medium text-xl"></h3>
        <div className="bg-slate-800 py-3 px-3 rounded-sm flex flex-col gap-y-3">
          <div className="flex justify-between">
            <span className="text-white text-lg font-medium">
              Danh Sách Đơn Hàng
            </span>
            <select
              className="p-1 bg-white w-28 outline-none rounded-sm"
              name=""
              id=""
            >
              <option value="1">All</option>
              <option value="2">Đã Giao</option>
              <option value="3">Đang xử lý</option>
            </select>
          </div>
          <table className="items-center border-spacing-y-2 text-white w-full bg-transparent border-separate ">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Khách Hàng
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Số Điện Thoại
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Địa Chỉ
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Trạng Thái
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Tổng Tiền
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Chi Tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.length > 0 &&
                data?.orders?.map((order: IOrder) => {
                  return <OrderItem key={order.id} item={order} />;
                })}
            </tbody>
          </table>
          {!data?.orders && (
            <LoadingSkeleton columns={1} height={50} count={8} columnRow={4} />
          )}
          <PaginationComponent
            totalPages={pagination?.totalPages}
            pageCurrent={pagination?.current}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
