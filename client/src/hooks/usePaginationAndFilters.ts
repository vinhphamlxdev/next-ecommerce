import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export interface PaginationState {
  current: number;
  totalPages: number;
}

export interface FiltersState {
  pageNum: number;
  itemsPerPage: number;
  category?: string;
  sortfield?: string;
  sortdir?: string;
  status?: string;
  colorName?: string;
  discount?: string;
}
interface PaginationAndFiltersHook {
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  handlePageChange: (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => void;
}
export default function usePaginationAndFilters(
  initialPagination: PaginationState,
  initialFilters: FiltersState
) {
  const router = useRouter();
  const { query } = router;
  const queryClient = useQueryClient();
  const [pagination, setPagination] =
    React.useState<PaginationState>(initialPagination);
  const [filters, setFilters] = React.useState<FiltersState>(initialFilters);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      pageNum: newPage - 1,
    }));
    const queryParams = { ...query };
    if (newPage) {
      queryParams.pageNum = newPage.toString();
    } else {
      delete queryParams.pageNum;
    }
    router.push({
      pathname: router.pathname,
      query: queryParams,
    });
  };
  const handleCategoryChange = (slug: string) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      category: slug,
    }));
    const queryParams = { ...query };
    if (slug) {
      queryParams.category = slug;
    } else {
      delete queryParams.category;
    }
    router.push({
      pathname: router.pathname,
      query: queryParams,
    });
  };
  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const { value } = event.target;
    const sorts = value.split("-");
    if (!value) {
      return;
    }
    const newFilters = {
      sortField: sorts[0],
      sortDir: sorts[1],
    };
    queryClient.setQueryData(["filters"], newFilters);
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilters,
    }));
  };
  const handleChangeStatusOrder = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
    const queryParams = { ...query };
    if (value) {
      queryParams.status = value;
    } else {
      delete queryParams.status;
    }
    router.push({
      pathname: router.pathname,
      query: queryParams,
    });
  };
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      colorName: value,
    }));
    const queryParams = { ...query };
    if (value) {
      queryParams.colorName = value;
    } else {
      delete queryParams.colorName;
    }
    router.push({
      pathname: router.pathname,
      query: queryParams,
    });
  };
  return {
    pagination,
    setPagination,
    filters,
    setFilters,
    handlePageChange,
    handleCategoryChange,
    handleSortChange,
    handleChangeStatusOrder,
    handleColorChange,
  };
}
