import * as React from "react";

export interface IBreadcrumbProps {
  titlePage: string;
}

export default function Breadcrumb({ titlePage }: IBreadcrumbProps) {
  return (
    <div className="px-20 bg-[#f5f5f5] mb-10">
      <div className="py-4">
        <div className="flex gap-x-3 items-center">
          <span className="text-sm font-light text-textColor">Trang chủ</span>
          <span> / </span>
          <span className="text-sm text-[#0089ff] font-light uppercase">
            {titlePage}
          </span>
        </div>
      </div>
    </div>
  );
}
