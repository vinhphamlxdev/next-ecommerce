import { LoadingSpinner } from "@/Admin/components/Loading";
import ProductDetail from "@/components/ProductDetailItem";
import LayoutClient from "@/components/layout/LayoutMain";
import { getProduct, getProductBySlug } from "@/pages/api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  const { data, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug as string),
    onSuccess: (data) => {
      console.log("product data:", data);
    },
    onError: (err: any) => {
      toast.error("co loi:", err);
    },
  });

  return (
    <LayoutClient>
      <div className="wrapper-layout">
        <div className="product-detail-page mt-10">
          {data && <ProductDetail item={data} />}
        </div>
      </div>
    </LayoutClient>
  );
}
