import * as React from "react";

export interface IInputModalProps {
  title: string;
  value: string;
  disabled?: boolean;
  change?: any;
  setData?: any;
  id?: string;
}

export default function InputModal({
  title,
  value,
  disabled = true,
  change,
  setData,
  id,
}: IInputModalProps) {
  const valuedynamic = {
    [change ? "value" : "defaultValue"]: value,
  };
  return (
    <div className="flex flex-col items-start text-[#5F5F5F]">
      <span className="mb-2 text-[15px]">{title}</span>
      <input
        id={id}
        name={id}
        className=" w-full py-2 px-1 bg-[#F5F5F1] text-[14px] rounded-[5px]"
        disabled={disabled}
        type="text"
        style={{ border: "1px solid #D9D9D9" }}
        {...valuedynamic}
        onChange={setData}
      />
    </div>
  );
}
