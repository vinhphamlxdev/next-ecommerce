import * as React from "react";
import BestSeller from "@/components/BestSeller";
import Slider from "@/components/Slider";
import { getAllProducts } from "@/service/ProductApi";
import { IProduct } from "@/types/interface";
import dynamic from "next/dynamic";
const LayoutClient = dynamic(() => import("@/components/layout/LayoutMain"), {
  ssr: false,
});
export interface IHomeProps {}

export default function HomeClient(props: IHomeProps) {
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
      <Slider />
      <div className="wrapper-layout">
        <BestSeller data={products} />
      </div>
    </LayoutClient>
  );
}
