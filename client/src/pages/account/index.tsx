"use client";

import Breadcrumb from "@/components/Breadcrumb";
import LayoutClient from "@/components/layout/LayoutMain";
import { useAuthContext } from "@/context/useAuthContext";
import { useRouter } from "next/router";
import * as React from "react";
import { BsHouseDoor, BsPhone } from "react-icons/bs";
import { MdFlight } from "react-icons/md";
import { toast } from "react-toastify";

export interface IAccountProps {}

export default function Account(props: IAccountProps) {
  const router = useRouter();
  const { dispatch, state } = useAuthContext();
  const user = state.authUser;
  React.useEffect(() => {
    if (!user) {
      toast.warning("chưa đăng nhập");
      router.push("/home");
    }
  }, []);
  return (
    <LayoutClient>
      <Breadcrumb titlePage="Tài khoản" />
      <div className="wrapper-layout">
        <div className="py-10">
          <h4 className="text-textColor font-semibold text-xl mb-7">
            Trang khách hàng
          </h4>
          <div className="flex items-center gap-x-2">
            <span className="text-textColor text-sm font-bold">Xin chào,</span>
            <span className="text-sm font-medium text-bgPrimary">
              {user?.fullName}{" "}
              <span className="text-textColor text-sm font-bold">!</span>
            </span>
          </div>
          <div className="p-3 mt-10 border border-[#ebebeb] rounded-md">
            <h4 className="text-lg font-medium uppercase text-textColor mb-7">
              Tài Khoản Của tôi
            </h4>
            <div className="flex flex-col gap-y-5">
              <div className="flex gap-x-3 items-center">
                <div>
                  Tên tài khoản:{" "}
                  <span className="text-textColor font-bold text-sm">
                    {user?.fullName}
                  </span>
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <BsHouseDoor className="text-bgPrimary"></BsHouseDoor>
                <span className="text-sm text-textColor font-medium">
                  Địa chỉ:
                </span>
              </div>
              <div className="flex gap-x-3 items-center">
                <BsPhone className="text-bgPrimary"></BsPhone>
                <span className="text-sm text-textColor font-medium">
                  Điện thoại:
                </span>
              </div>
              <div className="flex gap-x-3 items-center">
                <MdFlight className="text-bgPrimary"></MdFlight>
                <span className="text-sm text-textColor font-medium">
                  Quốc gia:
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutClient>
  );
}
