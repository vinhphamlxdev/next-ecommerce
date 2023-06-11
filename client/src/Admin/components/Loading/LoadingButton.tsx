import * as React from "react";
import style from "@/styles/admin/loading.module.scss";
export interface ILoadingButtonProps {}

export default function LoadingButton(props: ILoadingButtonProps) {
  return <div className={style.circleLoading}></div>;
}
