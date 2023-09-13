import * as React from "react";
import AddCategory from "@/Admin/components/AddCategory";
import Input from "@/Admin/components/Input";
import LayoutAdmin from "@/Admin/components/layout";
import { BiSave } from "react-icons/bi";
import axios from "axios";
import { use } from "react";
import { ICategory, IFilters } from "@/types/interface";
import Swal from "sweetalert2";
import getMessage from "@/utils/notification";
import CategoryItem from "@/Admin/components/CategoryItem";
import { useGlobalStore } from "@/store/globalStore";
import { LoadingSkeleton } from "@/Admin/components/Loading";
import PaginationComponent from "@/Admin/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "@/pages/api/CategoryApi";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";
export default function Category() {
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

  const { data, isLoading } = useQuery({
    queryKey: ["categorys", filters],
    queryFn: () => getAllCategory(filters),
    onSuccess: (data) => {
      // console.log(data);
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
        <div className="admin-category mt-5 flex flex-col gap-y-4">
          <AddCategory filters={filters} categorys={data?.categorys} />
          <div className="p-3 flex shadow-lg flex-col gap-y-4 bg-white rounded-lg">
            <h3 className="font-medium text-xl ">Tất Cả Danh Mục</h3>
            {data?.categorys &&
              data?.categorys.map((c: ICategory, index: number) => {
                return (
                  <CategoryItem
                    category={c}
                    key={c.id}
                    id={c.id as number}
                    filters={filters}
                  />
                );
              })}
            {isLoading && (
              <LoadingSkeleton
                columns={1}
                height={50}
                count={8}
                columnRow={4}
              />
            )}
            <PaginationComponent
              totalPages={pagination?.totalPages}
              pageCurrent={pagination?.current}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
