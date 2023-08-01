import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";
import { getAllProduct, getProductBySlug } from "@/pages/api/ProductApi";
import { toast } from "react-toastify";
import NextArrow from "../NextArrow";
import PrevArrow from "../PreArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IProduct } from "@/types/interface";
import ProductItem from "../Producttem";
export interface ISimilarProductProps {
  slug: string;
}

export default function SimilarProduct({ slug }: ISimilarProductProps) {
  let slickProperty = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  const initialPagination: PaginationState = {
    current: 1,
    totalPages: 3,
  };
  const initialFilters: FiltersState = {
    pageNum: 0,
    itemsPerPage: 6,
    category: slug,
  };
  const { filters, setFilters, handleCategoryChange } = usePaginationAndFilters(
    initialPagination,
    initialFilters
  );
  const { isError, data, error, refetch, isLoading } = useQuery({
    queryKey: ["products", filters],
    onSuccess: (data) => {},
    enabled: slug !== undefined,
    queryFn: () => getAllProduct(filters),
    onError: (err) => {
      console.log(err);
    },
  });
  console.log("similar productđ", data);

  return (
    <div className="product-similar-layout pb-10">
      <Slider {...slickProperty}>
        {data &&
          data?.products?.length > 0 &&
          data?.products?.map((product: IProduct) => {
            return <ProductItem item={product} key={product.id} />;
          })}
      </Slider>
    </div>
  );
}
