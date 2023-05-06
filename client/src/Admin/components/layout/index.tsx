import * as React from "react";
import SideBar from "./SideBar";
import Main from "./Main";
import Header from "./Header";

export interface LayoutAdminProps {
  children: React.ReactNode;
}

export default function LayoutAdmin(props: LayoutAdminProps) {
  return (
    <div className="w-full overflow-hidden flex h-screen bg-[#f5f8fe] light">
      <SideBar />
      <Header></Header>
      <Main>
        <div>{props.children}</div>
      </Main>
    </div>
  );
}
