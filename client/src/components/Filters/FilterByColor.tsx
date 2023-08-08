import { colorData } from "@/Admin/components/ChooseColor";
import getColorClassName from "@/utils/getColorClassName";
import * as React from "react";
import { styled } from "styled-components";

export interface IFilterByColorProps {
  onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterByColor({ onChangeColor }: IFilterByColorProps) {
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  return (
    <StyledFilterColor className="filter-by-color flex flex-col gap-y-4">
      <span className=" font-semibold  top-7 left-14 text-[#333] text-lg ">
        MÀU SẮC
      </span>
      <div className="flex flex-col gap-y-3">
        {colorData.map((color) => {
          return (
            <div
              key={color.id}
              data-value={color.colorName}
              className="flex items-center gap-x-3"
            >
              <div
                className={`swatch-element w-7 h-7 rounded-full border  flex justify-center items-center ${
                  selectedColor === color.colorName ? "border-gray-600" : ""
                }`}
              >
                <input
                  className="hidden"
                  id={`swatch-${color.colorName}`}
                  type="radio"
                  name="color-option"
                  value={color.colorName}
                  onChange={(event) => {
                    onChangeColor(event);
                    setSelectedColor(event.target.value);
                  }}
                />
                <label
                  className={`color-label cursor-pointer flex justify-center items-center w-5 h-5 rounded-full  select-none  border 
                            ${getColorClassName(color.colorName)}
                            `}
                  htmlFor={`swatch-${color.colorName}`}
                ></label>
              </div>
              <span className="text-sm text-textColor">{color.colorName}</span>
            </div>
          );
        })}
      </div>
    </StyledFilterColor>
  );
}
const StyledFilterColor = styled.div``;
