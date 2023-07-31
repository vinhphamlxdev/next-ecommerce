import * as React from "react";
import { GetCategorySimple as getCategory } from "../../../hooks/useCategory";
import { GrFormClose } from "react-icons/gr";
import { ICategory, IFilters } from "@/types/interface";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getAllCategory } from "@/pages/api/CategoryApi";
export interface SelectProps {
  label?: string;
  select: any;
  setSelect: React.Dispatch<React.SetStateAction<any>>;
  id: string;
  error?: string;
}

export default function Select({
  select = [],
  label,
  setSelect,
  id,
  error,
}: SelectProps) {
  const [key, setKey] = React.useState(1);

  const [filters, setFilters] = React.useState<IFilters>({
    pageNum: 0,
    itemsPerPage: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = JSON.parse(e.target.value);
    setSelect(values);
  };
  const handleRemove = () => setSelect([]);
  const { isError, data, refetch, isLoading } = useQuery({
    queryKey: ["categorys", filters],
    queryFn: () => getAllCategory(filters),
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {select.name && (
          <div className="text-white  w-full capitalize flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light bg-saveBg text-xs">
            <span>{select?.name}</span>
            <i
              onClick={() => handleRemove()}
              className="bi bi-x-lg text-white leading-[0px] text-xs cursor-pointer "
            ></i>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <select
          key={key}
          name={id}
          id={id}
          onChange={(e) => {
            handleChange(e);
            setKey((key) => key + 1);
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
        >
          <option value={-1}>---Chọn Danh Mục---</option>
          {data?.categorys.map((value: ICategory, index: number) => {
            return (
              <option
                className="capitalize"
                key={value.id}
                value={JSON.stringify(value)}
              >
                {value.name}
              </option>
            );
          })}
        </select>
        <span className="text-red-500 text-sm font-normal"> {error || ""}</span>
      </div>
    </div>
  );
}
