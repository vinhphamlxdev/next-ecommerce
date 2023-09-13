import { iconList } from "@/common/constanst";
import * as React from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";

export interface IIconPopupProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputMessage: string;
}

export default function IconPopup({
  show,
  setShow,
  setInputValue,
  inputMessage,
}: IIconPopupProps) {
  const handleSelectedIcon = (icon: string) => {
    setInputValue(inputMessage + icon);
  };
  return (
    <div
      style={{ display: show ? "" : "none" }}
      className="absolute  bottom-[30px] right-3 z-[100] w-80 shadow-3xl bg-[#edede9] rounded-md rounded-br-none"
    >
      <i
        onClick={() => setShow(false)}
        className="bi hover:text-primary text-black text-base  cursor-pointer absolute top-0 right-3 bi-x"
      ></i>
      <div className="h-60 px-3 mt-2 pt-4 pb-3 has-scrollbar">
        <div className="grid grid-cols-7 gap-x-3">
          {iconList.map((item: string, index: number) => {
            return (
              <div
                onClick={() => handleSelectedIcon(item)}
                key={index}
                className="cursor-pointer p-1 select-none hover:bg-white rounded-lg transition-all icon-react"
              >
                <div>{item}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-3 flex gap-x-2 py-2 border-t border-bordermood">
        <div className="p-2 cursor-pointer rounded-full hover:bg-moodbg transition-all">
          <BsFillEmojiSmileFill className={`text-sm `}></BsFillEmojiSmileFill>
        </div>
      </div>
    </div>
  );
}
