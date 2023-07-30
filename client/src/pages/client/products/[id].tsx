import ProductDetail from "@/components/ProductDetailItem";
import LayoutClient from "@/components/layout/LayoutMain";
import { getProduct } from "@/service/ProductApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
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
