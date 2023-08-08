import { LoadingSkeleton } from "@/Admin/components/Loading";
import { IMG_SRC } from "@/common/constanst";
import { useGlobalStore } from "@/store/globalStore";
import * as React from "react";
import ProductItem from "../Producttem";
import LoadingProduct from "@/Admin/components/Loading/LoadingProduct";
import { IProduct } from "@/types/interface";
import styled from "styled-components";
import Link from "next/link";
export interface IBestSellerProps {
  data: IProduct[];
  isLoading: boolean;
}

export default function BestSeller({ data, isLoading }: IBestSellerProps) {
  return (
    <StyledBestSeller className="section-populars">
      <div className="pb-12">
        {/* <div className="section-title">
          <h4 className="inline-block mt-10 pb-2 border-2 border-t-0 border-r-0 border-l-0 border-b-gray-500">
            Bán Chạy Nhất
          </h4>
        </div> */}
        {isLoading && (
          <div className="mt-5">
            <LoadingSkeleton
              columns={4}
              height={200}
              count={12}
              columnRow={4}
            />
          </div>
        )}
        <div className="grid py-20 gap-y-5 grid-cols-4 gap-x-7">
          {data?.length > 0 &&
            data?.map((product: IProduct, index: number) => {
              return <ProductItem key={product.id} item={product} />;
            })}
        </div>
        <div className="flex justify-center mt-7 items-center">
          <Link
            href="/products"
            className="btn-view-all hover:bg-[#0089ff] bg-textColor  transition-all  "
          >
            Xem Thêm
          </Link>
        </div>
      </div>
    </StyledBestSeller>
  );
}
const StyledBestSeller = styled.div`
  .btn-view-all {
    cursor: pointer;
    position: relative;
    display: inline-block;
    padding: 10px 28px;
    line-height: normal;
    color: #fff;
  }
`;
