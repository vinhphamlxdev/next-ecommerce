import { LoadingSpinner } from "@/Admin/components/Loading";
import Breadcrumb from "@/components/Breadcrumb";
import ProductDetail from "@/components/ProductDetailItem";
import SimilarProduct from "@/components/SimilarProduct";
import LayoutClient from "@/components/layout/LayoutMain";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";
import { getProduct, getProductBySlug } from "@/pages/api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const initialPagination: PaginationState = {
    current: 1,
    totalPages: 3,
  };
  const initialFilters: FiltersState = {
    pageNum: 0,
    itemsPerPage: 6,
    category: "",
  };
  const { filters, setFilters, handleCategoryChange } = usePaginationAndFilters(
    initialPagination,
    initialFilters
  );
  const { data, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug as string),
    enabled: slug !== undefined,
    onSuccess: (data) => {
      console.log("product data:", data);
    },
    onError: (err: any) => {
      toast.error("co loi:", err);
    },
  });

  return (
    <LayoutClient>
      <Breadcrumb titlePage={`${data?.name}`} />
      <div className="wrapper-layout">
        <div className="product-detail-page mt-10">
          {data && <ProductDetail item={data} />}
          <div className="mt-8">
            <div className="text-white px-7 py-2 inline-block font-semibold bg-bgPrimary uppercase text-base">
              MÔ TẢ
            </div>
            <div className="px-3 py-4 flex flex-col border border-borderPrimary">
              <h3 className="text-base mb-4 font-semibold text-textColor">
                Hệ thống cửa hàng
              </h3>
              <div className="flex flex-col gap-y-5">
                <span className="text-sm text-textColor">
                  - CN 1: 445 Sư Vạn Hạnh, P.12, Q.10
                </span>
                <span className="text-sm text-textColor">
                  - CN 2: 48 Trần Quang Diệu, P.14, Q.3
                </span>
                <span className="text-sm text-textColor">
                  - CN 3: 463 Quang Trung, P.10, Q. Gò Vấp
                </span>
                <span className="text-sm text-textColor">
                  - CN 4: 350 Điện Biên Phủ, P.17, Q. Bình Thạnh (GTOWN 1)
                </span>
                <span className="text-sm text-textColor">
                  - CN 5: 136 Nguyễn Hồng Đào, P14, Q. Tân Bình (GTOWN 2)
                </span>
                <span className="text-sm text-textColor">
                  - CN 6: TNP - 26 Lý Tự Trọng, P. Bến Nghé, Q.1
                </span>
              </div>
            </div>
            <div className="flex mt-6 flex-col gap-y-4">
              <h4 className="text-textColor text-2xl font-semibold">
                Sản phẩm cùng loại
              </h4>
              <SimilarProduct slug={data?.category?.slug} />
            </div>
          </div>
        </div>
      </div>
    </LayoutClient>
  );
}
