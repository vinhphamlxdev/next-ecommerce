import * as React from "react";
import BestSeller from "@/components/BestSeller";
import Slider from "@/components/Slider";
import { IProduct } from "@/types/interface";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/pages/api/ProductApi";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";

const LayoutClient = dynamic(() => import("@/components/layout/LayoutMain"), {
  ssr: false,
});

export default function HomeClient() {
  const initialPagination: PaginationState = {
    current: 1,
    totalPages: 3,
  };

  const initialFilters: FiltersState = {
    pageNum: 0,
    itemsPerPage: 8,
  };
  const { filters, handlePageChange, pagination, setFilters, setPagination } =
    usePaginationAndFilters(initialPagination, initialFilters);
  const { isError, data, error, refetch, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getAllProduct(filters),
    onSuccess: (data) => {},
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <LayoutClient>
      {/* <Slider /> */}
      <div className="wrapper-layout">
        <BestSeller isLoading={isLoading} data={data?.products} />
      </div>
    </LayoutClient>
  );
}
