"use client";

"use client"
import { useGlobalStore } from "@/store/globalStore";
import * as React from "react";

export interface MainProps {
  children: React.ReactNode;
}

export default function Main(props: MainProps) {
  const { setBgHeader } = useGlobalStore((state) => state);
  const layoutRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const layoutElm = layoutRef?.current;
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const scrollValid = target.scrollTop;
      setBgHeader(scrollValid > 10);
    };
    if (layoutElm) {
      layoutElm.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (layoutElm) {
        layoutElm.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <div
      ref={layoutRef}
      className="flex-1 has-scrollbar admin-content pb-14 pt-24 px-4"
    >
      {props.children}
    </div>
  );
}
