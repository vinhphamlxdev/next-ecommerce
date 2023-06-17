import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
import { useGlobalStore } from "@/store/globalStore";
import style from "@/styles/admin/loading.module.scss";
export interface ILoadingSpinnerProps {}

export default function LoadingSpinner(props: ILoadingSpinnerProps) {
  const { isLoading, setLoading } = useGlobalStore();
  if (typeof document === "undefined")
    return <div className="modal-loading"></div>;
  return ReactDOM.createPortal(
    <div className="flex w-full h-full inset-0 fixed z-[500]">
      <div className="absolute inset-0 z-20 bg-black opacity-60 overlay "></div>
      <div className={` inset-0 m-auto  z-[600] ${style.spinner}`}></div>
    </div>,
    document.querySelector("body") as HTMLElement
  );
}
