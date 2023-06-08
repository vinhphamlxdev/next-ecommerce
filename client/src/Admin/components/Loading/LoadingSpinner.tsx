import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
export interface ILoadingSpinnerProps {}

export default function LoadingSpinner(props: ILoadingSpinnerProps) {
  if (typeof document === "undefined")
    return <div className="modal-loading"></div>;
  return ReactDOM.createPortal(
    <div className="relative flex z-50  items-center justify-center w-full h-screen bg-black ">
      <div className="flex absolute   items-center  justify-center w-[300px] h-[300px] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <Image className="object-cover w-full " src={IMG_SRC.loading} alt="" />
      </div>
    </div>,
    document.querySelector("body") as HTMLElement
  );
}
