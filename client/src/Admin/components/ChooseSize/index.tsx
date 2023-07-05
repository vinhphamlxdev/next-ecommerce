import * as React from "react";

export interface IChooseSizeProps {
  sizes: string[];
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
  error?: string;
  id: string;
  sizesDelete?: string[] | any;
  setDeleteSizes?: React.Dispatch<React.SetStateAction<string[]>>;
}
const sizesData = ["M", "S", "L", "XL", "XXL"];
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
    const sizeName = JSON.parse(e.target.value);
    let arrSize = [];
    const checkExist = sizesData.findIndex((size) => size === sizeName);
    const checkDuplicate = sizes.some((size) => size === sizeName);
    if (checkExist !== -1 && !checkDuplicate) {
      arrSize.push(sizeName);
      setSizes([...sizes, ...arrSize]);
    }
    const sizesNeedDelete = sizesData.filter((size) => {
      return ![...sizes].includes(sizeName);
    });
    if (typeof setDeleteSizes === "function") {
      setDeleteSizes(sizesNeedDelete);
    }
    console.log("size need delete:", sizesDelete);
  };
  console.log("sizes", sizes);
  const handleRemoveSize = (sizeName: string) => {
    const newArrSizes = sizes.filter((size) => size !== sizeName);
    setSizes(newArrSizes);

    if (typeof setDeleteSizes === "function") {
      setDeleteSizes([...sizesDelete, sizeName]);
      console.log("size need delete:", sizesDelete);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {sizes.length > 0 &&
          sizes.map((sizeName: any, index: number) => {
            return (
              <div
                key={index}
                className="text-white flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light bg-saveBg text-xs"
              >
                <span>{sizeName}</span>
                <i
                  onClick={() => handleRemoveSize(sizeName)}
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
                {value}
              </option>
            );
          })}
        </select>
        <span className="text-red-500 text-sm font-normal"> {error || ""}</span>
      </div>
    </div>
  );
}
