import * as React from "react";

export interface IuseFiltersProps {}

export default function useFilters(props: IuseFiltersProps) {
  const [pagination, setPagination] = React.useState({
    current: 1,
    tolalPages: 3,
  });
  const [filters, setFilters] = React.useState({
    pageNum: 0,
    itemsPerPage: 3,
  });

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      pageNum: newPage - 1,
    }));
  };
  return <div></div>;
}
