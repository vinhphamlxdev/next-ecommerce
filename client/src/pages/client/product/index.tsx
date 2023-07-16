import ProductItem from "@/components/ProductItem";
import { getAllProducts } from "@/service/ProductApi";
import { IProduct } from "@/types/interface";
import dynamic from "next/dynamic";
import * as React from "react";
import { BsFilterLeft } from "react-icons/bs";
import { GrFilter } from "react-icons/gr";
import { styled } from "styled-components";
const LayoutClient = dynamic(() => import("@/components/layout/LayoutMain"), {
  ssr: false,
});
export default function ProductClient() {
  const [products, setProducts] = React.useState<IProduct[] | any>();
  const [filters, setFilters] = React.useState({
    pageNum: 0,
    itemsPerPage: 6,
  });
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(filters);
        console.log(data);
        if (data && data?.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LayoutClient>
      <StyledProducts className="py-10">
        <div className="wrapper-layout">
          <div className="flex gap-x-10 relative">
            <div className="w-[30%] flex flex-col gap-y-4">
              <div className="search-section rounded-md ">
                <div className="flex flex-col gap-y-3">
                  <div className="flex gap-x-3 items-center">
                    <BsFilterLeft className="text-gray-500"></BsFilterLeft>
                    <div className=" font-medium  top-7 left-14 text-gray-500 text-xl">
                      Tìm kiếm
                    </div>
                  </div>
                  <div className="search-form flex relative overflow-hidden">
                    <input
                      className="text-textPrimary flex-1 border-r-0 text-sm outline-none h-10 border border-gray-400 rounded-sm px-3 focus:border-bgPrimary"
                      type="text"
                      placeholder="Tìm kiếm theo..."
                    />
                    <button className="text-white bg-bgPrimary px-3 transition-all rounded-sm h-10 hover:bg-secondary">
                      Tìm
                    </button>
                  </div>
                </div>
              </div>
              <div className="search-section filter-price">
                <div className="flex gap-x-3 items-center">
                  <GrFilter className="text-gray-500"></GrFilter>
                  <span className=" font-medium  top-7 left-14 text-gray-500 text-xl">
                    Bộ lọc tìm kiếm
                  </span>
                </div>
                <div className="my-4 gap-y-3 flex flex-col">
                  <div className="relative">
                    <button
                      className="font-semibold select-none text-base"
                      style={{
                        color: "rgb(245, 28, 28)",
                        borderBottom: "2px solid rgb(245, 28, 28)",
                      }}
                    >
                      Thấp đến cao
                      <i className="bi bi-arrow-up" />
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      className="font-semibold select-none text-base"
                      style={{
                        color: "rgb(102, 102, 102)",
                        borderBottom: "2px solid transparent",
                      }}
                    >
                      Cao đến thấp
                      <i className="bi  bi-arrow-down" />
                    </button>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="cntr">
                      <input
                        type="checkbox"
                        id="cbx"
                        className="hidden-xs-up"
                      />
                      <label htmlFor="cbx" className="cbx" />
                    </div>

                    <span className="">Áo Thun</span>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="cntr">
                      <input
                        type="checkbox"
                        id="cbx"
                        className="hidden-xs-up"
                      />
                      <label htmlFor="cbx" className="cbx" />
                    </div>

                    <span className="">Áo Hoodie</span>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="cntr">
                      <input
                        type="checkbox"
                        id="cbx"
                        className="hidden-xs-up"
                      />
                      <label htmlFor="cbx" className="cbx" />
                    </div>

                    <span className="">Áo Polo</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3">
                  <div className="flex flex-col gap-y-3">
                    <span className="text-secondary select-none text-sm font-medium">
                      Từ
                    </span>
                    <div className="p-3 flex gap-x-2 border border-gray-400 rounded-sm">
                      <span className="text-secondary font-semibold text-sm">
                        VND
                      </span>
                      <input
                        placeholder=""
                        type="number"
                        min={0}
                        name="salePrice_gte"
                        className="outline-none w-full text-secondary text-xs font-light"
                        defaultValue={0}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <span className="text-secondary select-none text-sm font-medium">
                      Đến
                    </span>
                    <div className="p-3 flex gap-x-2 border border-gray-400 rounded-sm">
                      <span className="text-secondary font-semibold text-sm">
                        VND
                      </span>
                      <input
                        placeholder=""
                        type="number"
                        name="salePrice_lt"
                        min={0}
                        className="outline-none w-full text-secondary text-xs font-light"
                        defaultValue={0}
                      />
                    </div>
                  </div>
                </div>
                <button className="text-white bg-bgPrimary px-5 mt-4 py-2 rounded-md text-base font-medium hover:bg-secondary transition-all">
                  Lọc
                </button>
              </div>
            </div>
            <div className="grid gap-y-5 grid-cols-3 gap-x-7">
              {products?.length > 0 &&
                products?.map((product: any, index: number) => {
                  return <ProductItem key={product.id} item={product} />;
                })}
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
    -webkit-box-shadow: 0 2px 22px rgb(0 0 0 / 10%);
    box-shadow: 0 2px 22px rgb(0 0 0 / 10%);
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
