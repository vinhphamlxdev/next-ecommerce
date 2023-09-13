import { LoadingSkeleton } from "@/Admin/components/Loading";
import PaginationComponent from "@/Admin/components/Pagination";
import FilterByCategory from "@/components/Filters/FilterByCategory";
import ProductFilter from "@/components/ProductFilter";
import ProductItem from "@/components/Producttem";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";
import { getAllCategory } from "@/pages/api/CategoryApi";
import { getAllProduct } from "@/pages/api/ProductApi";
import { ICategory, IProduct } from "@/types/interface";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import * as React from "react";
import { BsFilterLeft } from "react-icons/bs";
import { GrFilter } from "react-icons/gr";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import Breadcrumb from "@/components/Breadcrumb";
const LayoutClient = dynamic(() => import("@/components/layout/LayoutMain"), {
  ssr: false,
});
export default function ProductSale() {
  const initialPagination: PaginationState = {
    current: 1,
    totalPages: 3,
  };

  const initialFilters: FiltersState = {
    pageNum: 0,
    itemsPerPage: 6,
    category: "",
    sortfield: "",
    sortdir: "",
    discount: "1",
  };

  const options = [
    { value: "name-asc", label: "A → Z" },
    { value: "name-desc", label: "Z → A" },
    { value: "price-asc", label: "Giá tăng dần" },
    { value: "price-desc", label: "Giá giảm dần" },
    { value: "createdat-asc", label: "Sản phẩm cũ nhất" },
    { value: "createdat-desc", label: "Sản phẩm mới nhất" },
  ];
  const {
    filters,
    handlePageChange,
    pagination,
    setPagination,
    handleCategoryChange,
    handleSortChange,
    handleColorChange,
    setFilters,
  } = usePaginationAndFilters(initialPagination, initialFilters);
  const router = useRouter();
  const [searchResult, setSearchResult] = React.useState<IProduct[] | any>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const { query } = router;
  const { isError, data, error, refetch, isLoading } = useQuery({
    queryKey: ["products", filters],
    onSuccess: (data) => {
      console.log("sale product:", data);
      const { page } = data;
      setPagination({
        current: page?.current,
        totalPages: page?.totalPages,
      });
    },
    queryFn: () => getAllProduct(filters),
    onError: (err) => {
      console.log(err);
    },
  });
  React.useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      discount: "1",
    }));
  }, []);

  return (
    <LayoutClient>
      <Breadcrumb titlePage="CLEARANCE SALE"></Breadcrumb>
      <StyledProducts className="py-10">
        <div className="wrapper-layout">
          <div className="flex gap-x-10 relative">
            <ProductFilter
              onColorChange={handleColorChange}
              setSearchResult={setSearchResult}
              onCategoryChange={handleCategoryChange}
              filters={filters}
            />
            <div className="flex flex-col gap-y-3 w-full">
              <div className="sort-bar border-b border-[#e1e1e1] pb-4 mb-3 flex justify-end items-center">
                <div className="flex gap-x-3 items-center">
                  <span className="text-sm font-normal ">Sắp xếp:</span>
                  <select
                    onChange={(event) => {
                      const { value } = event?.target;
                      handleSortChange(event);
                      const queryParams = { ...query };
                      if (value) {
                        queryParams.sortfield = value;
                      } else {
                        delete queryParams.sortfield;
                      }
                      router.push({
                        pathname: router.pathname,
                        query: queryParams,
                      });
                    }}
                    className="px-3  border border-[#e1e1e1] w-[150px] bg-white h-9 outline-none rounded-sm"
                  >
                    <option value="">Mặc định</option>
                    {options.map((item, index) => {
                      return (
                        <option key={item.label} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {searchResult?.length > 0 ? (
                <div className="grid gap-y-5 grid-cols-3 gap-x-7">
                  {searchResult.map((product: IProduct, index: number) => {
                    return <ProductItem key={product.id} item={product} />;
                  })}
                </div>
              ) : (
                <div className="grid gap-y-5 grid-cols-3 gap-x-7">
                  {data?.products?.length > 0 &&
                    data?.products
                      ?.filter(
                        (product: IProduct) =>
                          product.discount?.discountPrice > 0
                      )
                      .map((product: IProduct, index: number) => {
                        return <ProductItem key={product.id} item={product} />;
                      })}
                </div>
              )}
              {data?.products?.length === 0 && (
                <div className="text-base text-center">không có sản phẩm</div>
              )}
              {isLoading && (
                <LoadingSkeleton
                  columns={4}
                  height={200}
                  count={12}
                  columnRow={4}
                />
              )}
              <PaginationComponent
                totalPages={pagination?.totalPages}
                pageCurrent={pagination?.current}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </StyledProducts>
    </LayoutClient>
  );
}
const StyledProducts = styled.div`
  .search-section {
    padding: 20px;
    /* -webkit-box-shadow: 0 2px 22px rgb(0 0 0 / 10%);
    box-shadow: 0 2px 22px rgb(0 0 0 / 10%); */
  }
  .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected {
    color: #fff;
    background-color: #f51c1c;
  }
  .cbx {
    position: relative;
    top: 1px;
    width: 20px;
    height: 20px;
    border: 1px solid #c8ccd4;
    border-radius: 3px;
    vertical-align: middle;
    transition: background 0.1s ease;
    cursor: pointer;
    display: block;
  }

  .cbx:after {
    content: "";
    position: absolute;
    top: 1px;
    left: 6px;
    width: 7px;
    height: 14px;
    opacity: 0;
    transform: rotate(45deg) scale(0);
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transition: all 0.3s ease;
    transition-delay: 0.15s;
  }

  .lbl {
    margin-left: 5px;
    vertical-align: middle;
    cursor: pointer;
  }

  #cbx:checked ~ .cbx {
    border-color: transparent;
    background: #ff0000;
    animation: jelly 0.6s ease;
  }

  #cbx:checked ~ .cbx:after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }

  .cntr {
    position: relative;
  }

  @keyframes jelly {
    from {
      transform: scale(1, 1);
    }

    30% {
      transform: scale(1.25, 0.75);
    }

    40% {
      transform: scale(0.75, 1.25);
    }

    50% {
      transform: scale(1.15, 0.85);
    }

    65% {
      transform: scale(0.95, 1.05);
    }

    75% {
      transform: scale(1.05, 0.95);
    }

    to {
      transform: scale(1, 1);
    }
  }

  .hidden-xs-up {
    display: none !important;
  }
`;
