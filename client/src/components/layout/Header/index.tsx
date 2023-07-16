"use client";
import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { useGlobalStore } from "@/store/globalStore";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { IProduct } from "@/types/interface";
import { usePathname } from "next/navigation";
import { styled } from "styled-components";

export interface IHeaderClientProps {}
const navLinks = [
  {
    id: 1,
    href: "/client/home",
    name: "Trang Chủ",
  },
  {
    id: 2,
    href: "/client/product",
    name: "Sản Phẩm",
  },
  {
    id: 3,
    href: "/client/profile",
    name: "Giới Thiệu",
  },
];
export default function HeaderClient(props: IHeaderClientProps) {
  const { scrollHeader, setScrollHeader } = useGlobalStore((state) => state);
  const { cartItems } = useCartStore((state) => state);
  const pathname = usePathname();
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
  const countCartItems = cartItems.reduce(
    (count: number, product: IProduct) => {
      return count + product.quantity;
    },
    0
  );
  return (
    <StyledHeader
      className={`header z-[500] px-3 relative ${scrollHeader ? "active" : ""}`}
    >
      <div className="relative flex items-center justify-between">
        <Link href="/client/home" className="w-16 cursor-pointer header-logo">
          <Image src={IMG_SRC.logo} alt="" />
        </Link>
        <div className="flex nav-bar gap-x-5">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                className={isActive ? "text-bgPrimary" : "text-black"}
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
              <Link
                href="/client/signin"
                className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3"
              >
                <FiLogIn className="text-lg font-medium text-textPrimary" />

                <span className="text-textPrimary whitespace-nowrap font-medium text-sm">
                  Đăng nhập
                </span>
              </Link>

              {/* <div className="py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-x-3 px-3">
                <i className="bi text-textPrimary text-lg bi-person-check-fill"></i>

                <span className="text-textPrimary capitalize whitespace-nowrap font-medium text-sm">
                  vinh pham
                </span>
              </div> */}
              {/* <div className="py-2 cursor-pointer hover:bg-gray-200 z-50 flex items-center gap-x-3 px-3">
                <BiLogInCircle className="text-lg font-medium text-textPrimary" />
                <span className="text-textPrimary font-medium text-sm">
                  Đăng kí
                </span>
              </div> */}
              {/* <div className="py-2 cursor-pointer hover:bg-gray-200 z-50 flex items-center gap-x-3 px-3">
                <BiLogOutCircle className="text-lg font-medium text-textPrimary" />
                <span className="text-textPrimary font-medium text-sm">
                  Đăng xuất
                </span>
              </div> */}
              <div className="py-2 cursor-pointer hover:bg-gray-200 z-50 flex items-center gap-x-3 px-3">
                <i className="bi bi-bank2 text-xs font-medium text-textPrimary"></i>
                <span className="text-textPrimary font-medium text-sm">
                  Lịch sử đơn hàng
                </span>
              </div>
            </div>
          </div>
          <div className="relative text-2xl text-textPrimary">
            <span className="text-white cursor-pointer top[-6px] right-[-8px] absolute text-xs bg-bgPrimary rounded-full w-4 h-4 flex justify-center items-center">
              0
            </span>
            <i className="transition-all cursor-pointer bi text-textPrimary hover:text-bgPrimary bi-heart"></i>
          </div>
          <Link
            href="/client/cart"
            className="relative text-2xl text-textPrimary"
          >
            <i className="transition-all cursor-pointer bi text-textPrimary hover:text-bgPrimary bi-cart"></i>
            <span className="text-white cursor-pointer top-[-1px] right-[-8px] absolute text-xs bg-bgPrimary rounded-full w-4 h-4 flex justify-center items-center">
              {countCartItems}
            </span>
          </Link>
        </div>
      </div>
    </StyledHeader>
  );
}
const StyledHeader = styled.div`
  padding-left: 40px;
  padding-right: 40px;
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
