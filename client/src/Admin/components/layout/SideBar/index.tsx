import { IMG_SRC } from "@/common/constanst";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";

interface SidebarProps {}
const sidebarLink: {
  id: number;
  title: string;
  icon: any;
  path: string;
  children?: any;
}[] = [
  {
    id: 1,
    title: "Home",
    icon: <AiOutlineHome />,
    path: "/admin/home",
  },
  {
    id: 100,
    title: "Category",
    icon: <AiOutlineShoppingCart />,
    path: "/admin/category",
  },

  {
    id: 2,
    title: "Products",
    icon: "",
    path: "/admin/products",
    children: [
      {
        id: 1,
        title: "All Product",
        path: "/admin/product",
      },
      {
        id: 2,
        title: "Add Product",
        path: "/admin/add-product",
      },
      {
        id: 3,
        title: "Recently Product",
        path: "/admin/recently-product",
      },
    ],
  },
  {
    id: 3,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    path: "/admin/order",
    children: [
      {
        id: 1,
        title: "All Order",
        path: "/admin/all-order",
      },
      {
        id: 2,
        title: "Order Pending",
        path: "/admin/pending-order",
      },
    ],
  },
  {
    id: 4,
    title: "Users",
    icon: <AiOutlineUser />,
    path: "/admin/user",
    children: [
      {
        id: 1,
        title: "User Active",
        path: "/admin/active-user",
      },
      {
        id: 2,
        title: "User Inactive",
        path: "/admin/inactive-user",
      },
    ],
  },
  {
    id: 5,
    title: "Setting",
    icon: <AiOutlineSetting />,
    path: "/admin/settings",
  },
];

export default function SideBar(props: SidebarProps) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="w-72 p-3 admin-sidebar h-full bg-white">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <Image className="w-16 h-16" src={IMG_SRC.logo} alt="" />
          </div>
        </div>
        <div className="sidebar-menu-list flex flex-col gap-y-3">
          {sidebarLink.map((link) => {
            return (
              <Link
                href={link.path}
                key={link.id}
                className={`px-2 transition-all hover:bg-bgMenu  cursor-pointer rounded-md  py-4 flex items-center gap-x-3 ${
                  link.path === pathname ? "bg-bgMenu text-purple-500" : ""
                } `}
              >
                {link.icon}
                <span className="font-normal">{link.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
