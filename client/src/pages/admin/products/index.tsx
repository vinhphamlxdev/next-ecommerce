import * as React from "react";
import { BsEye } from "react-icons/bs";
import LayoutAdmin from "@/Admin/components/layout";
import { DeleteIcon, EditIcon } from "@/components/Icons/AppIcon";
import Image from "next/image";
import { IMG_SRC } from "@/common/constanst";
import axios from "axios";
import { IProduct } from "@/types/interface";
import { GetServerSideProps } from "next";
import { useGlobalStore } from "@/store/globalStore";
import { LoadingSkeleton, LoadingSpinner } from "@/Admin/components/Loading";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import getMessage from "@/utils/notification";
import { useRouter } from "next/router";
import { useModalStore } from "@/store/modalStore";
import ModalProductEdit from "@/Admin/components/Modal/ModalProductEdit";
import HeaderTable from "@/Admin/components/HeaderTable";
import Pagination from "@/Admin/components/Pagination";
import PaginationComponent from "@/Admin/components/Pagination";
import ModalProductDetail from "@/Admin/components/Modal/ModalProductDetail";
import formatVnd from "@/utils/formatVnd";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/pages/api/ProductApi";
import ProductItemAdmin from "@/Admin/components/ProductItem";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";
function Products() {
  const thHeader: string[] = [
    "Tên sản phẩm",
    "Giá",
    "Số lượng",
    "Chỉnh sửa",
    "Xóa",
    "Chi tiết",
  ];
  const router = useRouter();
  const initialPagination: PaginationState = {
    current: 1,
    totalPages: 3,
  };

  const initialFilters: FiltersState = {
    pageNum: 0,
    itemsPerPage: 6,
  };
  const { filters, handlePageChange, pagination, setFilters, setPagination } =
    usePaginationAndFilters(initialPagination, initialFilters);

  const { isError, data, error, refetch, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getAllProduct(filters),
    onSuccess: (data) => {
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
    <>
      <LayoutAdmin>
        <div className="admin-product p-3 bg-white shadow-md rounded-md">
          <div className="bg-slate-800 py-3 px-3  rounded-sm flex flex-col gap-y-3">
            <div className="flex justify-between p-3 items-center">
              <span className="text-white text-lg font-medium">
                Danh Sách Sản Phẩm
              </span>
              <button
                onClick={() => router.push("/admin/add-product")}
                className="text-white font-normal text-sm bg-saveBg px-3 py-[6px] rounded-md"
              >
                Thêm Sản Phẩm
              </button>
            </div>

            <table className="items-center border-spacing-y-2 text-white w-full bg-transparent border-separate ">
              <HeaderTable data={thHeader} />
              <tbody className=" w-full ">
                {data?.products?.map((product: IProduct, index: number) => {
                  return (
                    <ProductItemAdmin
                      item={product}
                      key={product.id}
                      filters={filters}
                    />
                  );
                })}
              </tbody>
            </table>
            {data?.products?.length === 0 && (
              <div className="text-white text-xl text-center">
                Chưa có sản phẩm
              </div>
            )}
            {isLoading && (
              <LoadingSkeleton
                columns={1}
                height={50}
                count={8}
                columnRow={4}
              />
            )}
          </div>
          <PaginationComponent
            totalPages={pagination?.totalPages}
            pageCurrent={pagination?.current}
            onPageChange={handlePageChange}
          />
        </div>
      </LayoutAdmin>
    </>
  );
}
export default dynamic(() => Promise.resolve(Products), { ssr: false });
