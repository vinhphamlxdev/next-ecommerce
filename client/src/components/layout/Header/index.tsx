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
import { useMutation, useQuery } from "@tanstack/react-query";
import deleteFromCookie from "@/token/deleteFromCookie";
import calculateTotalCart from "@/utils/caculateTotalCart";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
import { useCartContext } from "@/context/useCartContext";
import brand from "@/assets/logo.png";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";
import { getProductByKeyword } from "@/pages/api/ProductApi";
import { useRouter } from "next/navigation";

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
export default function HeaderClient() {
  const { scrollHeader, setScrollHeader } = useGlobalStore((state) => state);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const { state: cartState } = useCartContext();
  const router = useRouter();
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
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      return;
    }

    router.push(`/search?keyword=${searchValue}`);
    setSearchValue("");
  };

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
          <Image
            className="object-cover"
            width={75}
            height={75}
            src={brand}
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
            <div className="relative search-control-icon">
              <i className="bi text-lg text-gray-600 cursor-pointer hover:text-bgPrimary transition-all bi-search"></i>
              <div className="absolute top-[42px] search-control hidden   right-0">
                <form
                  onSubmit={handleSearch}
                  className="search-form flex  overflow-hidden"
                >
                  <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="text-textPrimary flex-1 border-r-0 text-sm outline-none h-10 border border-gray-400 rounded-sm px-3 focus:border-bgPrimary"
                    type="text"
                    placeholder="Tìm kiếm theo..."
                  />
                  <button
                    type="submit"
                    className="text-white w-14 bg-bgPrimary px-3 transition-all rounded-sm h-10 hover:bg-secondary"
                  >
                    <span> Tìm</span>
                  </button>
                </form>
              </div>
            </div>
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
              <BsHandbag className="text-textColor hover:text-bgPrimary"></BsHandbag>
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
