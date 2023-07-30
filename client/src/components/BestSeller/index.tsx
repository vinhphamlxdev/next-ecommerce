import { LoadingSkeleton } from "@/Admin/components/Loading";
import { IMG_SRC } from "@/common/constanst";
import { useGlobalStore } from "@/store/globalStore";
import * as React from "react";
import ProductItem from "../Producttem";
import LoadingProduct from "@/Admin/components/Loading/LoadingProduct";
import { IProduct } from "@/types/interface";
import styled from "styled-components";
export interface IBestSellerProps {
  data: IProduct[];
}

export default function BestSeller({ data }: IBestSellerProps) {
  const { isLoading } = useGlobalStore((state) => state);
  return (
    <StyledBestSeller className="section-populars">
      <div className="pb-12">
        <div className="section-title">
          <h4 className="inline-block mt-10 pb-2 border-2 border-t-0 border-r-0 border-l-0 border-b-gray-500">
            Bán Chạy Nhất
          </h4>
        </div>

        {!data ? (
          <LoadingProduct />
        ) : (
          <>
            <div className="grid gap-y-5 grid-cols-4 gap-x-7">
              {data?.length > 0 &&
                data?.map((product: any, index: number) => {
                  return <ProductItem key={product.id} item={product} />;
                })}
            </div>
            <div className="flex justify-center mt-7 items-center">
              <button className="btn-view-all hover:opacity-80 transition-all  ">
                Xem Thêm
              </button>
            </div>
          </>
        )}
      </div>
    </StyledBestSeller>
  );
}
const StyledBestSeller = styled.div`
  .btn-view-all {
    &:hover {
      text-decoration: none;
    }
    cursor: pointer;
    position: relative;
    display: inline-block;
    padding: 10px 28px;
    line-height: normal;
    color: #fff;
    border: 1px solid #323232;
    border-radius: 0;
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    letter-spacing: 1px;
    background-color: transparent;
    -webkit-transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
      border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
      border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    z-index: 1;
    overflow: hidden;
    &::before {
      position: absolute;
      content: "";
      display: block;
      left: -2px;
      top: 0;
      right: -2px;
      bottom: 0;
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      -webkit-transform-origin: left center;
      transform-origin: left center;
      z-index: -1;
      background-color: #323232;
      -webkit-transition: -webkit-transform 0.45s
        cubic-bezier(0.785, 0.135, 0.15, 0.86);
      transition: -webkit-transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
      transition: transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
      transition: transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
        -webkit-transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
  }
`;
