import * as React from "react";

export interface IInputProps {
  id: string;
  data: string;
  setData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder: string;
  type?: string;
  error?: string;
}

export default function Input({
  id,
  data,
  setData,
  label,
  placeholder,
  type = "text",
  error,
}: IInputProps) {
  return (
    <div className="flex items-center gap-x-4">
      <label
        htmlFor={id}
        className="text-gray-500 w-[150px] text-center text-sm"
      >
        {label}
      </label>
      <div className="name-category relative flex-1 w-full">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={data}
          onChange={setData}
          className="outline-none w-full border border-gray-300 text-sm text-gray-400 px-3 py-2"
        />
        <span className="text-red-500 text-sm font-normal"> {error || ""}</span>
      </div>
    </div>
  );
}
