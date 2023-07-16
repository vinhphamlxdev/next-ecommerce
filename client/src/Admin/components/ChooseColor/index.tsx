import { IColor } from "@/types/interface";
import * as React from "react";

export interface IChooseColorProps {
  colors: IColor[];
  setColors: React.Dispatch<React.SetStateAction<IColor[]>>;
  error?: string;
  id: string;
  colorsDelete?: number[] | any;
  setDeleteColors?: React.Dispatch<React.SetStateAction<number[]>>;
}
const colorData = [
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
  colors = [],
  setColors,
  id,
  error,
  colorsDelete,
  setDeleteColors,
}: IChooseColorProps) {
  const [key, setKey] = React.useState(1);
  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorObj = JSON.parse(e.target.value);
    let arrSize = [];
    const checkExist = colorData.findIndex(
      (color: IColor) => color.colorName === colorObj.colorName
    );
    const checkDuplicate = colors.some(
      (color) => color.colorName === colorObj.colorName
    );
    if (checkExist !== -1 && !checkDuplicate) {
      arrSize.push(colorObj);
      setColors([...colors, ...arrSize]);
    }
  };
  const handleRemoveColor = (id: number) => {
    const newArrColors = colors.filter((color: any) => color.id !== id);
    setColors(newArrColors);
    if (typeof setDeleteColors === "function") {
      setDeleteColors([...colorsDelete, id]);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {colors.length > 0 &&
          colors.map((color: IColor, index: number) => {
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
                <span>{color?.colorName}</span>
                <i
                  onClick={() => handleRemoveColor(color?.id)}
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
              <option key={index} value={JSON.stringify(value)}>
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
export const btnColorStyle = `text-white flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light  text-xs`;
