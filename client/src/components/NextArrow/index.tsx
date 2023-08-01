import * as React from "react";
import { BiChevronRight } from "react-icons/bi";
import { MdArrowForwardIos, MdOutlineArrowForwardIos } from "react-icons/md";
import styled from "styled-components";
export interface INextArrowProps {
  onClick?: () => void;
}

export default function NextArrow({ onClick }: INextArrowProps) {
  return (
    <button onClick={onClick} className={`${styleBtnNext}`}>
      <MdOutlineArrowForwardIos />
    </button>
  );
}
let styleBtnNext = `next-btn top-2/4 -translate-y-2/4 -right-5 font-light inline-block z-50 absolute text-textColor text-4xl slick-slide__btn`;
