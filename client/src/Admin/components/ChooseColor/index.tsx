import { IColor } from "@/types/interface";
import getColorClassName from "@/utils/getColorClassName";
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
    id: "$2a$10fewlUMSLbvue8TX2Alcx",
    colorName: "Black",
    delete: false,
  },
  {
    id: "$2a$10$ZUMSLbvfue8TX2Alcxd",
    colorName: "White",
    delete: false,
  },
  {
    id: "$2a$10$ZUMSLbvuhe8TX2Alcdsf",
    colorName: "Green",
    delete: false,
  },
  {
    id: "$2a$10$ZUMSLbsvue8TX2Alcxhds",
    colorName: "Blue",
    delete: false,
  },
  {
    id: "$2a$10$ZUMSpkomdse8TX2Alklcxhds",
    colorName: "Dark Red",
    delete: false,
  },
  {
    id: "$2a$10$Zdasdiojiomdse8TX2cxhds",
    colorName: "Belge",
    delete: false,
  },
  {
    id: "$2a$10$ZdamlkiojiomdsmkTX2cxhds",
    colorName: "Metal Blue",
    delete: false,
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
  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorObj = JSON.parse(e.target.value);
    let arrColor = [];

    const checkExist = colorData.findIndex(
      (color) => color.colorName === colorObj.colorName
    );
    const checkDuplicate = colors.some(
      (color) => color.colorName === colorObj.colorName
    );
    if (checkExist !== -1 && !checkDuplicate) {
      arrColor.push(colorObj);
      const colorNotDelete = colors.map((color) => {
        return {
          ...color,
          delete: false,
        };
      });
      setColors([...colorNotDelete, ...arrColor]);
    }
  };
  const handleRemoveColor = (id: number) => {
    const newArrColors = colors.filter((size) => size.id !== id);
    setColors(newArrColors);
    if (typeof setDeleteColors === "function") {
      if (typeof id === "number") {
        setDeleteColors([...colorsDelete, id]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {colors.length > 0 &&
          colors
            .filter((color) => !color.delete)
            .map((color: IColor, index: number) => {
              return (
                <div
                  key={index}
                  className={`${btnColorStyle} ${getColorClassName(
                    color.colorName
                  )} `}
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
            handleChangeColor(e);
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
