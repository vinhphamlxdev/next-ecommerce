import { IPage } from "@/types/interface";
import { Pagination } from "@mui/material";
import * as React from "react";

export interface IPaginationProps {
  totalPages: number;
  pageCurrent: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function PaginationComponent({
  totalPages,
  pageCurrent,
  onPageChange,
}: IPaginationProps) {
  return (
    <div className="text-center flex justify-center items-center mt-7">
      <Pagination count={totalPages} onChange={onPageChange} shape="rounded" />
    </div>
  );
}
