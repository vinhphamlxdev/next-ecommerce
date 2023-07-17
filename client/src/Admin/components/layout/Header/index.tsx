import { IMG_SRC } from "@/common/constanst";
import { useStateContext } from "@/context";
import { useGlobalStore } from "@/store/globalStore";
import Image from "next/image";
import * as React from "react";
import { BiLogInCircle } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter();
  const { isSticky } = useGlobalStore();
  const { state, dispatch } = useStateContext();
  const user = state.authUser;
  const onLogoutHandler = async () => {
    //delete user from local storage
    dispatch({ type: "LOG_OUT", payload: null });
    toast.success("Đăng xuất thành công");
  };
  React.useEffect(() => {
    if (user?.roles[0]?.name !== "ROLE_ADMIN") {
      router.push("/client/home");
      toast.error("Vui lòng đăng nhập với quyền ADMIN");
    }
  }, [user]);
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
        <button className="user-avatar relative cursor-pointer">
          <Image
            className="w-8 h-8 rounded-full object-cover"
            src={IMG_SRC.avatar}
            alt=""
          />
          <div className="absolute hidden w-44 select-none  shadow-lg border border-gray-200 -left-[153px] py-3 popup-user flex-col rounded-md bg-white">
            {user && (
              <div className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3">
                <i className="bi text-textPrimary text-lg bi-person-check-fill"></i>

                <span className="text-textPrimary capitalize whitespace-nowrap font-medium text-sm">
                  {user?.fullName}
                </span>
              </div>
            )}
            {!user && (
              <div className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3">
                <i className="bi text-textPrimary text-lg bi-person-check-fill"></i>

                <span className="text-textPrimary capitalize whitespace-nowrap font-medium text-sm">
                  Tài Khoản
                </span>
              </div>
            )}
            <Link
              href="/client/home"
              className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3"
            >
              <MdOutlineAdminPanelSettings className="leading-[0px] text-xl"></MdOutlineAdminPanelSettings>

              <span className="text-textPrimary capitalize whitespace-nowrap font-medium text-sm">
                Khách hàng
              </span>
            </Link>
            <div
              onClick={() => onLogoutHandler()}
              className="py-2 cursor-pointer hover:bg-gray-200 z-50 flex items-center gap-x-3 px-3"
            >
              <BiLogInCircle className="text-lg font-medium text-textPrimary" />
              <span className="text-textPrimary font-medium text-sm">
                Đăng xuất
              </span>
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
