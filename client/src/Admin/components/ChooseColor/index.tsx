import * as React from "react";

export interface IChooseColorProps {
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
  error?: string;
  id: string;
  colorsDelete?: string[];
  setDeleteColors?: React.Dispatch<React.SetStateAction<string[]>>;
}
const colorData: string[] = ["Đen", "Trắng", "Xanh Lá", "Xanh Da Trời"];
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
    const colorName = JSON.parse(e.target.value);
    let arrColors = [];
    const checkExist = colorData.findIndex((name) => name === colorName);
    const checkDuplicate = colors.some((name) => name === colorName);
    if (checkExist !== -1 && !checkDuplicate) {
      arrColors.push(colorName);
      setColors([...colors, ...arrColors]);
    }
  };
  const handleRemoveColor = (colorName: string) => {
    const newArrcolors = colors.filter((name) => name !== colorName);
    setColors(newArrcolors);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#f5f5f5] h-14 p-3 flex gap-x-3">
        {colors.length > 0 &&
          colors.map((colorName: string, index: number) => {
            return (
              <div
                key={index}
                className={`${btnColorStyle} ${
                  colorName === "Đen"
                    ? "bg-[#293241]"
                    : colorName === "Trắng"
                    ? "bg-[#adb5bd] text-black"
                    : colorName === "Xanh Lá"
                    ? "bg-saveBg"
                    : colorName === "Xanh Da Trời"
                    ? "bg-[#4cc9f0]"
                    : ""
                } `}
              >
                <span>{colorName}</span>
                <i
                  onClick={() => handleRemoveColor(colorName)}
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
export const btnColorStyle = `text-white flex  gap-x-3 justify-center items-center px-3 py-[6px] rounded-xl font-light  text-xs`;
