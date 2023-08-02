"use client";
import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { useGlobalStore } from "@/store/globalStore";
import Link from "next/link";
import { IProduct } from "@/types/interface";
import { usePathname } from "next/navigation";
import { styled } from "styled-components";
import { useAuthContext } from "@/context/useAuthContext";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import deleteFromCookie from "@/token/deleteFromCookie";
import calculateTotalCart from "@/utils/caculateTotalCart";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
import { useCartContext } from "@/context/useCartContext";
export interface IHeaderClientProps {}
const navLinks = [
  {
    id: 1,
    href: "/home",
    name: "Home",
  },
  {
    id: 2,
    href: "/products",
    name: "Clothing",
  },
  {
    id: 3,
    href: "/sales",
    name: "CLEARANCE SALE",
  },
  {
    id: 4,
    href: "/contact",
    name: "Contact",
  },
];
export default function HeaderClient(props: IHeaderClientProps) {
  const { scrollHeader, setScrollHeader } = useGlobalStore((state) => state);
  const { state: cartState } = useCartContext();
  const cartItems = cartState.cartItems;
  const pathname = usePathname();
  const { dispatch, state } = useAuthContext();
  const user = state.authUser;
  const onLogoutHandler = async () => {
    //delete user from local storage
    dispatch({ type: "LOG_OUT", payload: null });
    toast.success("Đăng xuất thành công");
  };

  React.useEffect(() => {
    const handleScroll = () => {
      let scrollValue = document.documentElement.scrollTop;
      setScrollHeader(scrollValue > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledHeader>
      <div className="px-10 py-3 bg-textColor flex justify-between items-center">
        <span className="text-white text-sm font-normal">
          Hotline: 0933.738.685
        </span>
        <div className="flex gap-x-10 items-center">
          {!user && (
            <Link className="text-white text-sm" href="/signup">
              Đăng ký
            </Link>
          )}
          {user && (
            <Link className="text-white text-sm" href="/account">
              Tài khoản
            </Link>
          )}
          {user && (
            <button
              onClick={() => onLogoutHandler()}
              className="text-white text-sm"
            >
              Đăng xuất
            </button>
          )}
          {!user && (
            <Link className="text-white text-sm" href="/signin">
              Đăng nhập
            </Link>
          )}
          <Link className="text-white text-sm" href="/contact">
            Liên hệ
          </Link>
        </div>
      </div>
      <div className="px-10 h-20  flex justify-center items-center">
        <Link href="/home">
          <img
            src="https://bizweb.dktcdn.net/100/318/614/themes/667160/assets/logo.png?1681444077990"
            alt=""
          />
        </Link>
      </div>
      <div className="header z-[500] px-20 relative border-t border-[#ebebeb] h-16">
        <div className="relative h-full flex items-center justify-between">
          <div className="flex nav-bar items-center h-full gap-x-5">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  className={
                    isActive
                      ? "text-bgPrimary font-semibold text-sm uppercase"
                      : "text-textColor font-semibold text-sm uppercase"
                  }
                  href={link.href}
                  key={link.name}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center header-right gap-x-4">
            <div className="text-2xl icon-user relative text-textPrimary">
              <i className="transition-all cursor-pointer bi text-textPrimary hover:text-bgPrimary bi-person"></i>
              <div className="absolute w-44 select-none hidden shadow-lg border border-gray-200 -left-[153px] py-3 popup-user flex-col rounded-md bg-white">
                {!user && (
                  <Link
                    href="/signin"
                    className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3"
                  >
                    <FiLogIn className="text-lg font-medium text-textPrimary" />

                    <span className="text-textPrimary whitespace-nowrap font-medium text-sm">
                      Đăng nhập
                    </span>
                  </Link>
                )}

                {user && (
                  <div className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3">
                    <i className="bi text-textPrimary text-lg bi-person-check-fill"></i>

                    <span className="text-textPrimary capitalize whitespace-nowrap font-medium text-sm">
                      {user?.fullName}
                    </span>
                  </div>
                )}
                {user && user?.roles[0]?.name === "ROLE_ADMIN" && (
                  <Link
                    href="/admin/home"
                    className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3"
                  >
                    <MdOutlineAdminPanelSettings className="leading-[0px] text-xl"></MdOutlineAdminPanelSettings>

                    <span className="text-textPrimary capitalize whitespace-nowrap font-medium text-sm">
                      Quản lý
                    </span>
                  </Link>
                )}
                {!user && (
                  <Link
                    href="/signup"
                    className="py-2 cursor-pointer hover:bg-gray-200 z-50 flex items-center gap-x-3 px-3"
                  >
                    <BiLogInCircle className="text-lg font-medium text-textPrimary" />
                    <span className="text-textPrimary font-medium text-sm">
                      Đăng kí
                    </span>
                  </Link>
                )}

                <Link
                  href="/account"
                  className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3"
                >
                  <MdOutlineAdminPanelSettings className="leading-[0px] text-xl"></MdOutlineAdminPanelSettings>

                  <span className="text-textPrimary capitalize whitespace-nowrap font-medium text-sm">
                    Thông tin cá nhân
                  </span>
                </Link>
              </div>
            </div>

            <Link href="/cart" className="relative text-2xl text-textPrimary">
              <BsHandbag className="text-textColor"></BsHandbag>
              <span className="text-white cursor-pointer top-[-1px] right-[-8px] absolute text-xs bg-bgPrimary rounded-full w-4 h-4 flex justify-center items-center">
                {calculateTotalCart(cartItems)}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="w-20 bg-bgPrimary h-[2px]"></div>
        </div>
      </div>
    </StyledHeader>
  );
}
const StyledHeader = styled.div`
  &.active {
    position: fixed;
    width: 100%;
    top: 0;
    background: #fff;
    left: 0;
    z-index: 200;
    -webkit-box-shadow: 0 0 7px rgb(0 0 0 / 15%);
    box-shadow: 0 0 7px rgb(0 0 0 / 15%);
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }
  .menu-item.active {
    color: #f51c1c;
  }
  .icon-user {
    &:hover .popup-user {
      display: flex;
    }
  }
`;
