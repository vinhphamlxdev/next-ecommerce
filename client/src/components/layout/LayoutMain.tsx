import { Manrope } from "next/font/google";
import * as React from "react";

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export interface LayoutMainProps {
  children: React.ReactNode;
}

export default function LayoutMain(props: LayoutMainProps) {
  return (
    <>
      <div
        className={`${manrope.className} dark:bg-black px-3 flex transition-colors duration-300 min-h-screen dark:text-white`}
      >
        {props.children}
      </div>
    </>
  );
}
