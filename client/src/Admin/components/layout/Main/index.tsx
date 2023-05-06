import { setBgHeaderAdmin } from "@/store/features/globalSlice";
import * as React from "react";
import { useDispatch } from "react-redux";

export interface MainProps {
  children: React.ReactNode;
}

export default function Main(props: MainProps) {
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const layoutElm = layoutRef?.current;
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const scrollValid = target.scrollTop;
      scrollValid > 10
        ? dispatch(setBgHeaderAdmin(true))
        : dispatch(setBgHeaderAdmin(false));
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
