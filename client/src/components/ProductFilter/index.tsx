import * as React from "react";
import FilterByCategory from "../Filters/FilterByCategory";
import { GrFilter } from "react-icons/gr";
import { BsFilterLeft } from "react-icons/bs";
import Search from "../Search";
import { IProduct } from "@/types/interface";

export interface IProductFilterProps {
  filters: any;
  onChange: (slug: string) => void;
  setSearchResult: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function ProductFilter({
  filters,
  onChange,
  setSearchResult,
}: IProductFilterProps) {
  return (
    <div className="w-[30%] flex flex-col gap-y-4">
      <Search setSearchResult={setSearchResult} />
      <div className="search-section filter-price">
        <div className="flex gap-x-3 items-center">
          <span className=" font-semibold  top-7 left-14 text-[#333] text-lg ">
            DANH MỤC SẢN PHẨM
          </span>
        </div>
        <div className="my-4 flex flex-col">
          <FilterByCategory filters={filters} onChangeCategory={onChange} />
        </div>
      </div>
    </div>
  );
}
