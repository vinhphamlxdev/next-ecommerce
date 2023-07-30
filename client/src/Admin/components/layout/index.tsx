import * as React from "react";
import SideBar from "./SideBar";
import Main from "./Main";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"), { ssr: false });
export interface LayoutAdminProps {
  children: React.ReactNode;
}

export default function LayoutAdmin(props: LayoutAdminProps) {
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
