import * as React from "react";
import FilterByCategory from "../Filters/FilterByCategory";
import { GrFilter } from "react-icons/gr";
import { BsFilterLeft } from "react-icons/bs";

export interface IProductFilterProps {
  filters: any;
  onChange: (slug: string) => void;
}

export default function ProductFilter({
  filters,
  onChange,
}: IProductFilterProps) {
  return (
    <div className="w-[30%] flex flex-col gap-y-4">
      <div className="search-section rounded-md ">
        <div className="flex flex-col gap-y-3 ">
          <div className="flex gap-x-3 items-center">
            <BsFilterLeft className="text-gray-500"></BsFilterLeft>
            <div className=" font-medium  top-7 left-14 text-gray-500 text-xl">
              Tìm kiếm
            </div>
          </div>
          <div className="search-form flex relative overflow-hidden">
            <input
              className="text-textPrimary flex-1 border-r-0 text-sm outline-none h-10 border border-gray-400 rounded-sm px-3 focus:border-bgPrimary"
              type="text"
              placeholder="Tìm kiếm theo..."
            />
            <button className="text-white bg-bgPrimary px-3 transition-all rounded-sm h-10 hover:bg-secondary">
              Tìm
            </button>
          </div>
        </div>
      </div>
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
