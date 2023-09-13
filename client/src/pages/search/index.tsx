import Breadcrumb from "@/components/Breadcrumb";
import ProductItem from "@/components/Producttem";
import LayoutClient from "@/components/layout/LayoutMain";
import { IProduct } from "@/types/interface";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { getProductByKeyword } from "../api/ProductApi";
import { LoadingSkeleton } from "@/Admin/components/Loading";
import PaginationComponent from "@/Admin/components/Pagination";
import { useRouter } from "next/router";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";

export default function SearchPage() {
  const rounter = useRouter();
  const queryParams = rounter.query;
  const initialPagination: any = {
    current: 1,
    totalPages: 3,
  };
  const initialFilters: any = {
    pageNum: 0,
    itemsPerPage: 8,
  };
  const [pagination, setPagination] = React.useState<any>(initialPagination);
  const [filterSearch, setFiltersSearch] = React.useState<any>(initialFilters);
  const newFilter = {
    pageNum: filterSearch.pageNum,
    keyword: queryParams.keyword,
  };
  const { data, isLoading } = useQuery({
    queryKey: ["search", queryParams, filterSearch],
    queryFn: () => getProductByKeyword(newFilter),
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
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setFiltersSearch((prevFilter: any) => ({
      ...prevFilter,
      pageNum: newPage - 1,
    }));
  };
  return (
    <LayoutClient>
      <Breadcrumb titlePage="Tìm Kiếm"></Breadcrumb>
      <div className="search-container wrapper-layout">
        <div className="grid gap-y-5 grid-cols-4 gap-x-7">
          {data?.products?.length > 0 &&
            data?.products?.map((product: IProduct, index: number) => {
              return <ProductItem key={product.id} item={product} />;
            })}
        </div>
        {isLoading && (
          <LoadingSkeleton columns={4} height={200} count={12} columnRow={4} />
        )}
        {data?.products?.length === 0 && (
          <div className="text-base text-center">không có kết quả phù hợp</div>
        )}
        <PaginationComponent
          totalPages={pagination?.totalPages}
          pageCurrent={pagination?.current}
          onPageChange={handlePageChange}
        />
      </div>
    </LayoutClient>
  );
}
