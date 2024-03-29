import * as React from "react";
import { styled } from "styled-components";
import ReactDOM from "react-dom";
import { IProduct } from "@/types/interface";
import { useModalStore } from "@/store/modalStore";
import ProductDetail from "../ProductDetailItem";
export interface IQuickViewProps {
  item: IProduct;
}

export default function QuickView({ item }: IQuickViewProps) {
  const { seletedProduct, showModalQuickView, setCloseModalQuickView } =
    useModalStore();
  const handleCloseModalQuickView = () => setCloseModalQuickView();
  if (typeof document === "undefined")
    return <div className="modal-quickview"></div>;
  return ReactDOM.createPortal(
    <StyledQuickView
      className={`modal-quickview ${
        showModalQuickView ? "" : "close-modal-quickview"
      } `}
    >
      <div
        onClick={handleCloseModalQuickView}
        className="absolute inset-0 z-20 bg-black opacity-60 overlay "
      ></div>
      <div className="w-[1000px]  bg-white rounded-[8px] overflow-hidden h-[550px]  relative z-50 max-h-full inset-0 m-auto modal-quickview p-4">
        {seletedProduct && <ProductDetail item={seletedProduct} />}
        <button
          onClick={handleCloseModalQuickView}
          className="absolute text-lg hover:text-bgPrimary p-3 z-[300] text-secondary close-modal-quickview top-4 right-4 "
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </StyledQuickView>,
    document.querySelector("body") as HTMLElement
  );
}
const StyledQuickView = styled.div`
  width: 100%;
  height: 100%;
  inset: 0;
  position: fixed;
  z-index: 999;
  display: flex;
  &.close-modal-quickview {
    display: none;
  }
  @keyframes fadeIn {
    0% {
      transform: translateY(-100px);
    }
    100% {
      transform: translateY(0);
    }
  }
  & .modal-quickview {
    will-change: scroll-position;
    scroll-behavior: smooth;
    overflow: hidden overlay;
    animation: fadeIn ease 0.5s;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &:hover::-webkit-scrollbar {
      width: 6px;
      display: inline-block;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background: #ccc;
    }
  }
`;
