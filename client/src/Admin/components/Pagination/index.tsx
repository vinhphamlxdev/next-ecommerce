import * as React from "react";

export interface IPaginationProps {
  pagination: any;
  onPageChange: any;
}

export default function Pagination({
  pagination,
  onPageChange = null,
}: IPaginationProps) {
  const { page, totalPage, itemPerpage } = pagination;

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  return (
    <div className="flex justify-center gap-x-3">
      <button
        disabled={page === 0}
        onClick={() => handlePageChange(page - 1)}
        className=""
      >
        Prev
      </button>
      <button
        disabled={page >= totalPage}
        onClick={() => handlePageChange(page + 1)}
        className=""
      >
        Next
      </button>
    </div>
  );
}
