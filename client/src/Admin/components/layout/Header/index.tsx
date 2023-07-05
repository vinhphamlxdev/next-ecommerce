import { IMG_SRC } from "@/common/constanst";
import { useGlobalStore } from "@/store/globalStore";
import Image from "next/image";
import * as React from "react";
import { toast } from "react-toastify";
export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const { isSticky } = useGlobalStore((state) => state);
  return (
    <header
      className={`admin-header fixed z-[200] top-0 right-0 w-[calc(100%-288px)] px-3  h-16  justify-between flex items-center ${
        isSticky ? "bg-white shadow-md" : ""
      }`}
    >
      <div className="flex shadow-lg items-center relative w-[250px] rounded-[20px] overflow-hidden ">
        <input
          className="bg-white pl-4 pr-10 py-2 flex-1  outline-none text-black"
          type="text"
          placeholder="Tìm kiếm..."
        />
        <button className="text-[20px] text-gray-500 absolute top-[50%] right-2 translate-y-[-50%] ">
          <i className="bi bi-search"></i>
        </button>
      </div>
      <div className="flex items-center gap-x-4">
        <button className="dark-mode cursor-pointer">
          <i className="bi text-2xl text-gray-400 bi-sun"></i>
        </button>
        <button className="user-avatar cursor-pointer">
          <Image
            className="w-8 h-8 rounded-full object-cover"
            src={IMG_SRC.avatar}
            alt=""
          />
        </button>
      </div>
    </header>
  );
}
