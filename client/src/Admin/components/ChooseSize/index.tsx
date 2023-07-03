import { ISize } from "@/types/interface";
import * as React from "react";

export interface IChooseSizeProps {
  sizes: ISize[];
  setSizes: React.Dispatch<React.SetStateAction<ISize[]>>;
  error?: string;
  id: string;
}
const sizesData = [
  {
    id: 1,
    name: "M",
  },
  {
    id: 2,
    name: "S",
  },
  {
    id: 3,
    name: "L",
  },
  {
    id: 4,
    name: "XL",
  },
  {
    id: 5,
    name: "XXL",
  },
];
export default function ChooseSize({
  sizes,
  setSizes,
  id,
  error,
}: IChooseSizeProps) {
  const [key, setKey] = React.useState(1);
  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeObj = JSON.parse(e.target.value);
    let arrSize = [];
    const checkExist = sizesData.findIndex((size) => size.id === sizeObj.id);
    const checkDuplicate = sizes.some((size) => size.id === sizeObj.id);
    if (checkExist !== -1 && !checkDuplicate) {
      arrSize.push(sizeObj);
      setSizes([...sizes, ...arrSize]);
    }
  };
  const handleRemoveSize = (id: number) => {
    const newArrSizes = sizes.filter((size) => size.id !== id);
    setSizes(newArrSizes);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {sizes?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="text-white flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light bg-saveBg text-xs"
            >
              <span>{item.name}</span>
              <i
                onClick={() => handleRemoveSize(item.id)}
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
            handleChangeSize(e);
            setKey((key) => key + 1);
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
        >
          <option value={-1}>---Chọn Size---</option>
          {sizesData.map((value, index) => {
            return (
              <option key={value?.id} value={JSON.stringify(value)}>
                {value?.name}
              </option>
            );
          })}
        </select>
        <span className="text-red-500 text-sm font-normal"> {error || ""}</span>
      </div>
    </div>
  );
}
