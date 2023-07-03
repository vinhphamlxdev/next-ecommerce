import * as React from "react";
import { GetCategorySimple as getCategory } from "../../../hooks/useCategory";
import { GrFormClose } from "react-icons/gr";
import { ICategory } from "@/types/interface";
import axios from "axios";
import { getAllCategorys } from "@/service/CategoryApi";
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
  const [categorys, setCategorys] = React.useState<ICategory[]>([]);
  React.useEffect(() => {
    async function fetchCategorys() {
      const res = await getAllCategorys({});
      if (res && res.categorys) {
        console.log(res.categorys);
        setCategorys(res.categorys);
      }
    }
    fetchCategorys();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = JSON.parse(e.target.value);
    setSelect(values);
    console.log(select);
  };
  const handleRemove = () => {
    setSelect([]);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        <div className="text-white  w-full capitalize flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light bg-saveBg text-xs">
          <>
            <span>{select?.name}</span>
            <i
              onClick={() => handleRemove()}
              className="bi bi-x-lg text-white leading-[0px] text-xs cursor-pointer "
            ></i>
          </>
        </div>
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
          {categorys.map((value, index) => {
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
