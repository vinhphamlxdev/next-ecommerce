import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface PaginationState {
  current: number;
  totalPages: number;
}

export interface FiltersState {
  pageNum: number;
  itemsPerPage: number;
  category: string;
  sortfield: string;
  sortdir: string;
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
  };
  const handleCategoryChange = (slug: string) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      category: slug,
    }));
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
  return {
    pagination,
    setPagination,
    filters,
    setFilters,
    handlePageChange,
    handleCategoryChange,
    handleSortChange,
  };
}
