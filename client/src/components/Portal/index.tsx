import * as React from "react";
import { createPortal } from "react-dom";

export interface IPortalProps {
  children: React.ReactNode;
}

export default function Portal(props: IPortalProps) {
  const ref = React.useRef<Element | null>(null);
  const [mounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);
  return mounted && ref.current
    ? createPortal(
        <div className="flex  w-full h-full fixed  inset-0 transition-all duration-700  z-[9999]">
          <div className="overlay-portal absolute inset-0 bg-black opacity-60 "></div>
          {props.children}
        </div>,
        ref.current
      )
    : null;
}
