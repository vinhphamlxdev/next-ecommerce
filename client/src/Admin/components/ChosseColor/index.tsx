import { IColor, ISize } from "@/types/interface";
import * as React from "react";

export interface IChooseColorProps {
  colors: IColor[];
  setColors: React.Dispatch<React.SetStateAction<IColor[]>>;
  error?: string;
  id: string;
}
const colorData: { id: number; colorName: string }[] = [
  {
    id: 1,
    colorName: "Đen",
  },
  {
    id: 2,
    colorName: "Trắng",
  },
  {
    id: 3,
    colorName: "Xanh Lá",
  },
  {
    id: 4,
    colorName: "Xanh Da Trời",
  },
];
export default function ChooseColor({
  colors,
  setColors,
  id,
  error,
}: IChooseColorProps) {
  const [key, setKey] = React.useState(1);
  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeObj = JSON.parse(e.target.value);
    let arrColors = [];
    const checkExist = colorData.findIndex((size) => size.id === sizeObj.id);
    const checkDuplicate = colors.some((size) => size.id === sizeObj.id);
    if (checkExist !== -1 && !checkDuplicate) {
      arrColors.push(sizeObj);
      setColors([...colors, ...arrColors]);
    }
  };
  const handleRemoveSize = (id: number) => {
    const newArrcolors = colors.filter((size) => size.id !== id);
    setColors(newArrcolors);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {colors?.map((color: IColor, index: number) => {
          console.log(colors);
          return (
            <div
              key={index}
              className={`${btnColorStyle} ${
                color.colorName === "Đen"
                  ? "bg-[#293241]"
                  : color.colorName === "Trắng"
                  ? "bg-[#adb5bd] text-black"
                  : color.colorName === "Xanh Lá"
                  ? "bg-saveBg"
                  : color.colorName === "Xanh Da Trời"
                  ? "bg-[#4cc9f0]"
                  : ""
              } `}
            >
              <span>{color.colorName}</span>
              <i
                onClick={() => handleRemoveSize(color.id)}
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
          <option value={-1}>---Chọn Màu---</option>
          {colorData.map((value, index) => {
            return (
              <option key={value?.id} value={JSON.stringify(value)}>
                {value?.colorName}
              </option>
            );
          })}
        </select>
        <span className="text-red-500 text-sm font-normal"> {error || ""}</span>
      </div>
    </div>
  );
}
const btnColorStyle = `text-white flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light  text-xs`;
