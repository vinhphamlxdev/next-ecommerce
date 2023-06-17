import * as React from "react";
import AddCategory from "@/Admin/components/AddCategory";
import Input from "@/Admin/components/Input";
import LayoutAdmin from "@/Admin/components/layout";
import { BiSave } from "react-icons/bi";
import axios from "axios";
import { use } from "react";
import { ICategory } from "@/types/interface";
import Swal from "sweetalert2";
import getMessage from "@/utils/getMessage";
import CategoryItem from "@/Admin/components/CategoryItem";
import { useGlobalStore } from "@/store/globalStore";
import { LoadingSkeleton } from "@/Admin/components/Loading";
import Pagination from "@/Admin/components/Pagination";
import { ICategorysResponse, getAllCategorys } from "@/service/CategoryApi";
export interface CategoryProps {
  data: ICategorysResponse;
}

export default function Category(props: CategoryProps) {
  const { setLoading, isLoading } = useGlobalStore((state) => state);
  const [pagination, setPagination] = React.useState({
    page: 1,
    itemPerpage: 4,
  });
  const [categorys, setCategorys] = React.useState<ICategory[]>([]);
  const [render, setRender] = React.useState<boolean>(true);
  const handlePageChange = (newPage: number) => {
    console.log("New page", newPage);
  };
  React.useEffect(() => {
    setLoading(true);
    const fetchCategorys = async () => {
      try {
        const data = await getAllCategorys();

        if (data && data?.categorys) {
          setCategorys(data.categorys);
          const { page } = data;
          setLoading(false);
          setPagination({
            page: page.current,
            itemPerpage: page.itemsPerPage,
          });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCategorys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  return (
    <>
      <LayoutAdmin>
        <div className="admin-category mt-5 flex flex-col gap-y-4">
          <AddCategory categorys={categorys} setRender={setRender} />
          <div className="p-3 flex shadow-lg flex-col gap-y-4 bg-white rounded-lg">
            <h3 className="font-medium text-xl ">All Category</h3>
            {!isLoading &&
              categorys &&
              categorys.map((c: any, index: number) => {
                return (
                  <CategoryItem
                    setData={setCategorys}
                    data={categorys}
                    index={index}
                    category={c}
                    key={c.id}
                    categorys={categorys}
                    id={c.id}
                    setRender={setRender}
                  />
                );
              })}
            {isLoading && (
              <LoadingSkeleton columns={1} count={7} columnRow={3} />
            )}
            {/* <Pagination
              onPageChange={handlePageChange}
              pagination={pagination}
            /> */}
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
