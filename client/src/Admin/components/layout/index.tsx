import * as React from "react";
import SideBar from "./SideBar";
import Main from "./Main";
import dynamic from "next/dynamic";
import getFromCookie from "@/token/getFromCookie";
import jwtDecode from "jwt-decode";
import { IDecodeToken } from "@/types/authInterface";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const Header = dynamic(() => import("./Header"), { ssr: false });
export interface LayoutAdminProps {
  children: React.ReactNode;
}

export default function LayoutAdmin(props: LayoutAdminProps) {
  const router = useRouter();
  React.useEffect(() => {
    const token = getFromCookie("access_token");
    if (!token) {
      router.push("/home");
      return;
    }
    const decodedToken: IDecodeToken = jwtDecode(token as string);
    const roleAdmin = decodedToken?.roles?.includes("ROLE_ADMIN");
    if (!roleAdmin) {
      router.push("/home");
      toast.error("Không có quyền truy cập!");
    }
  }, []);
  return (
    <div className="w-full overflow-hidden flex h-screen bg-[#f5f8fe] light">
      <SideBar />
      <Header />
      <Main>
        <div>{props.children}</div>
      </Main>
    </div>
  );
}
