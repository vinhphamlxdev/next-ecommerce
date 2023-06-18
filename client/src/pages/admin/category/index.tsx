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
import PaginationComponent from "@/Admin/components/Pagination";
export interface CategoryProps {
  data: ICategorysResponse;
}

export default function Category(props: CategoryProps) {
  const { setLoading, isLoading } = useGlobalStore((state) => state);
  const [pagination, setPagination] = React.useState({
    current: 1,
    tolalPages: 3,
  });
  const [filters, setFilters] = React.useState({
    pageNum: 0,
    itemsPerPage: 3,
  });
  const [categorys, setCategorys] = React.useState<ICategory[]>([]);
  const [render, setRender] = React.useState<boolean>(true);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      pageNum: newPage - 1,
    }));
  };
  React.useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const data = await getAllCategorys(filters);
        if (data && data?.categorys) {
          setCategorys(data.categorys);
          const { page } = data;
          setPagination({
            current: page?.current,
            tolalPages: page?.totalPages,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategorys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, filters]);

  return (
    <>
      <LayoutAdmin>
        <div className="admin-category mt-5 flex flex-col gap-y-4">
          <AddCategory categorys={categorys} setRender={setRender} />
          <div className="p-3 flex shadow-lg flex-col gap-y-4 bg-white rounded-lg">
            <h3 className="font-medium text-xl ">All Category</h3>
            {categorys &&
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
            {!categorys.length && (
              <LoadingSkeleton
                columns={1}
                height={50}
                count={8}
                columnRow={4}
              />
            )}
            <PaginationComponent
              totalPages={pagination?.tolalPages}
              pageCurrent={pagination?.current}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
