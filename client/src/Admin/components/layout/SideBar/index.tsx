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
import { BsDatabase, BsDatabaseAdd } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
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
    id: 2,
    title: "Category",
    icon: <BiCategoryAlt />,
    path: "/admin/category",
  },

  {
    id: 3,
    title: "Products",
    icon: <BsDatabase />,
    path: "/admin/products",
  },
  {
    id: 4,
    title: "Add product",
    icon: <BsDatabaseAdd />,
    path: "/admin/add-product",
  },
  {
    id: 5,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    path: "/admin/order",
  },
  {
    id: 6,
    title: "Users",
    icon: <AiOutlineUser />,
    path: "/admin/user",
  },
  {
    id: 7,
    title: "Setting",
    icon: <AiOutlineSetting />,
    path: "/admin/setting",
  },
];

export default function SideBar(props: SidebarProps) {
  const router = useRouter();
  const { pathname } = router;
  const handleClickNavbarItem = (item: any, id: number) => {
    console.log(item, id);
  };
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
            let Component = Link;
            return (
              <Component
                href={link.path}
                key={link.id}
                onClick={() => handleClickNavbarItem(link, link.id)}
                className={`px-2 transition-all hover:bg-bgMenu  cursor-pointer rounded-md  py-4 flex items-center gap-x-3 ${
                  link.path === pathname ? "bg-bgMenu text-purple-500" : ""
                } `}
              >
                {link.icon}
                <span className="font-normal">{link.title}</span>
              </Component>
            );
          })}
        </div>
      </div>
    </div>
  );
}
