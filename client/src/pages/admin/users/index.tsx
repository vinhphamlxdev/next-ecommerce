import * as React from "react";
import LayoutAdmin from "@/Admin/components/layout";
import { IMG_SRC } from "@/common/constanst";
import { IFilters } from "@/types/interface";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "@/pages/api/authApi";
import UserItem from "@/Admin/components/UserItem";
import { IUser } from "@/types/authInterface";
import { LoadingSkeleton } from "@/Admin/components/Loading";
import PaginationComponent from "@/Admin/components/Pagination";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";

export default function User() {
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

  const { isError, data, error, refetch, isLoading } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => getAllUser(filters),
    onSuccess: (data) => {
      console.log("User data:", data);
      const { page } = data;
      setPagination({
        current: page?.current,
        totalPages: page?.totalPages,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <LayoutAdmin>
      <div className="admin-user p-3 flex flex-col gap-y-3 rounded-sm bg-white shadow-md">
        <h3 className="font-medium text-xl"></h3>
        <div className="bg-slate-800 py-3 px-3 rounded-sm flex flex-col gap-y-3">
          <h3 className="text-white text-lg font-medium">
            Tài Khoản Người Dùng
          </h3>
          <table className="items-center border-spacing-y-2 text-white w-full bg-transparent border-separate ">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Tên
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Email
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Quyền
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 border-transparent whitespace-nowrap font-semibold text-left   ">
                  Trạng Thái
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.length > 0 &&
                data?.users?.map((user: IUser) => {
                  return <UserItem key={user.id} item={user} />;
                })}
            </tbody>
          </table>
          {isLoading && (
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
