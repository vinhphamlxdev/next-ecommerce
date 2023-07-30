import * as React from "react";
import { ISize } from "@/types/interface";
const { v4: uuidv4 } = require("uuid");

export interface IChooseSizeProps {
  sizes: ISize[];
  setSizes: React.Dispatch<React.SetStateAction<ISize[]>>;
  error?: string;
  id: string;
  sizesDelete?: number[] | any;
  setDeleteSizes?: React.Dispatch<React.SetStateAction<number[]>>;
}
const sizesData = [
  {
    id: "$2a$10$gZUMSLbvue8TX2Alcx",
    name: "M",
    delete: false,
  },
  {
    id: "$2a$10$ZUMSLbvfue8TX2Alcxd",
    name: "S",
    delete: false,
  },
  {
    id: "$2a$10$ZUMSLbvuhe8TX2Alcdsf",
    name: "L",
    delete: false,
  },
  {
    id: "$2a$10$ZUMSLbsvue8TX2Alcxhds",
    name: "XL",
    delete: false,
  },
  {
    id: "$2a$10$ZUMSLbvue8TX2Alcxhdae",
    name: "XXL",
    delete: false,
  },
];
export default function ChooseSize({
  sizes = [],
  setSizes,
  id,
  error,
  sizesDelete,
  setDeleteSizes,
}: IChooseSizeProps) {
  const [key, setKey] = React.useState(1);
  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeObj = JSON.parse(e.target.value);
    let arrSize = [];
    const checkExist = sizesData.findIndex(
      (size) => size.name === sizeObj.name
    );
    const checkDuplicate = sizes.some((size) => size.name === sizeObj.name);
    if (checkExist !== -1 && !checkDuplicate) {
      arrSize.push(sizeObj);
      const sizeNotDelete = sizes.map((size) => {
        return {
          ...size,
          delete: false,
        };
      });
      setSizes([...sizeNotDelete, ...arrSize]);
    }
  };
  const handleRemoveSize = (id: number) => {
    const newArrSizes = sizes.filter((size) => size.id !== id);
    setSizes(newArrSizes);
    if (typeof setDeleteSizes === "function") {
      if (typeof id === "number") {
        setDeleteSizes([...sizesDelete, id]);
        console.log("sizesDelete", sizesDelete);
      }
    }
  };
  console.log(sizes);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {sizes?.length > 0 &&
          sizes
            .filter((size) => !size.delete)
            .map((size: ISize) => {
              return (
                <div
                  key={size.id}
                  className="text-white flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light bg-saveBg text-xs"
                >
                  <span>{size.name}</span>
                  <i
                    onClick={() => handleRemoveSize(size?.id)}
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
              <option key={index} value={JSON.stringify(value)}>
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
