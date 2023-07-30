import { Manrope } from "next/font/google";
import * as React from "react";
import Footer from "./Footer";
import QuickView from "../Modal";
import { useModalStore } from "@/store/modalStore";
import dynamic from "next/dynamic";
const HeaderClient = dynamic(() => import("./Header"), {
  ssr: false, // Vô hiệu hóa server-side rendering (SSR)
});
const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient(props: LayoutClientProps) {
  const { seletedProduct, showModalQuickView } = useModalStore(
    (state) => state
  );
  return (
    <div
      className={`${manrope.className} w-full overflow-hidden  transition-colors duration-300 min-h-screen`}
    >
      <HeaderClient />
      {seletedProduct && showModalQuickView && (
        <QuickView item={seletedProduct} />
      )}
      {props.children}
      <Footer />
    </div>
  );
}
