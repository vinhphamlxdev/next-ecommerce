import { IPage } from "@/types/interface";
import { Pagination } from "@mui/material";
import * as React from "react";

export interface IPaginationProps {
  totalPages: number;
  pageCurrent: number;
  onPageChange?: any;
}

export default function PaginationComponent({
  totalPages,
  pageCurrent,
  onPageChange = null,
}: IPaginationProps) {
  return (
    <div className="text-center flex justify-center items-center mt-7">
      <Pagination count={totalPages} onChange={onPageChange} shape="rounded" />
    </div>
  );
}
