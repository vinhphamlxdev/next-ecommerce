import * as React from "react";
import FilterByCategory from "../Filters/FilterByCategory";
import { GrFilter } from "react-icons/gr";
import { BsFilterLeft } from "react-icons/bs";
import Search from "../Search";
import { IProduct } from "@/types/interface";
import FilterByColor from "../Filters/FilterByColor";

export interface IProductFilterProps {
  filters: any;
  onCategoryChange: (slug: string) => void;
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchResult: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function ProductFilter({
  filters,
  onCategoryChange,
  setSearchResult,
  onColorChange,
}: IProductFilterProps) {
  return (
    <div className="w-[30%] flex flex-col gap-y-4">
      <Search setSearchResult={setSearchResult} />
      <div className="search-section filter-price">
        <div className="mb-3 flex gap-y-3 flex-col">
          <FilterByCategory
            filters={filters}
            onChangeCategory={onCategoryChange}
          />
          <FilterByColor onChangeColor={onColorChange} />
        </div>
      </div>
    </div>
  );
}
