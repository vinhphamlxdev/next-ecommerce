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
      const res = await getAllCategorys();
      console.log(res);
      if (res && res.categorys) {
        console.log(res.categorys);
        setCategorys(res.categorys);
      }
    }
    fetchCategorys();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = JSON.parse(e.target.value);
    const isExist = select.findIndex((value: any) => value.id === values.id);
    if (isExist !== -1) {
      return;
    } else {
      setSelect([...select, values]);
    }
    console.log(select);
  };
  const handleRemove = (id: string) => {
    const newValues = select.filter((elm: any) => elm.id !== id);
    setSelect(newValues);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {select?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="text-white flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light bg-saveBg text-xs"
            >
              <span>{item.name}</span>
              <i
                onClick={() => handleRemove(item.id)}
                className="bi bi-x-lg text-white leading-[0px] text-xs cursor-pointer "
              ></i>
            </div>
          );
        })}
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
          <option value={-1}>---Choose Category---</option>
          {categorys.map((value, index) => {
            return (
              <option key={value.id} value={JSON.stringify(value)}>
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
