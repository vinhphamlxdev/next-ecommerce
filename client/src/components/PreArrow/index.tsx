import * as React from "react";
import { BiChevronLeft } from "react-icons/bi";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export interface IPrevArrowProps {
  onClick?: () => void;
}

export default function PrevArrow({ onClick }: IPrevArrowProps) {
  return (
    <button
      onClick={onClick}
      className="next-btn top-2/4 -translate-y-2/4 -left-5 font-light inline-block z-50 absolute text-textColor text-4xl slick-slide__btn"
    >
      <MdOutlineArrowBackIosNew />
    </button>
  );
}
