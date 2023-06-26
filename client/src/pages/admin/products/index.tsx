import * as React from "react";
import { BsEye } from "react-icons/bs";
import LayoutAdmin from "@/Admin/components/layout";
import { DeleteIcon, EditIcon } from "@/components/Icons/AppIcon";
import Image from "next/image";
import { IMG_SRC } from "@/common/constanst";
import axios from "axios";
import { IProduct } from "@/types/interface";
import { GetServerSideProps } from "next";
import ImageComponent from "@/Admin/components/ImageComponent";
import { useGlobalStore } from "@/store/globalStore";
import {
  deleteProductById,
  getAllProducts,
  getProductById,
} from "@/service/ProductApi";
import { LoadingSkeleton, LoadingSpinner } from "@/Admin/components/Loading";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import getMessage from "@/utils/getMessage";
import { useRouter } from "next/router";
import { useModalStore } from "@/store/modalStore";
import ModalTest from "@/Admin/components/Modal/ModalProductDetail";
import ModalProductEdit from "@/Admin/components/Modal/ModalProductEdit";
import HeaderTable from "@/Admin/components/HeaderTable";
import Pagination from "@/Admin/components/Pagination";
import PaginationComponent from "@/Admin/components/Pagination";

export interface ProductProps {}

function Products(props: ProductProps) {
  const thHeader: string[] = [
    "Name",
    "Price",
    "InStock",
    "Edit",
    "Delete",
    "Detail",
  ];
  const router = useRouter();
  const { setLoading, isLoading } = useGlobalStore();
  const { setOpenEditProduct, setOpenDetailProduct } = useModalStore();
  const [products, setProducts] = React.useState<IProduct[]>();
  const [product, setProduct] = React.useState<IProduct>();
  const [render, setRender] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState({
    current: 1,
    tolalPages: 3,
  });
  const [filters, setFilters] = React.useState({
    pageNum: 0,
    itemsPerPage: 5,
  });
  const deleteProduct = (id: number, name: string) => {
    Swal.fire({
      text: `Bạn muốn xóa sản phẩm: ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteProductById(id);
          getMessage("Đã xóa sản phẩm thành công!", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setRender((r) => !r);
      });
  };
  const handleEditProduct = async (id: number) => {
    setLoading(true);
    setOpenEditProduct(true);
    try {
      const response = await getProductById(id);
      setProduct(response?.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleViewDetail = async (id: number) => {
    setLoading(true);
    setOpenDetailProduct(true);
    try {
      const response = await getProductById(id);
      setProduct(response?.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
    setFilters((prevFilter) => ({
      ...prevFilter,
      pageNum: newPage - 1,
    }));
  };
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(filters);
        if (data && data?.products) {
          setProducts(data.products);
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
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, filters]);

  return (
    <>
      <LayoutAdmin>
        <div className="admin-product p-3 bg-white shadow-md rounded-md">
          <div className="bg-slate-800 py-3 px-3  rounded-sm flex flex-col gap-y-3">
            <div className="flex justify-between p-3 items-center">
              <span className="text-white text-lg font-medium">
                Product list
              </span>
              <button
                onClick={() => router.push("/admin/add-product")}
                className="text-white font-normal text-sm bg-saveBg px-3 py-[6px] rounded-md"
              >
                Add Product
              </button>
            </div>

            <table className="items-center border-spacing-y-2 text-white w-full bg-transparent border-separate ">
              <HeaderTable data={thHeader} />
              <tbody className=" w-full ">
                {products?.map((product: IProduct, index: number) => {
                  return (
                    <tr key={product.id} className="bg-gray-700 mt-2">
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <div className="relative  rounded-full">
                          <Image
                            className="rounded-full  w-14 h-14 flex-shrink-0 object-cover"
                            width={100}
                            height={100}
                            src={product?.imageUrls[0]}
                            alt=""
                          />
                        </div>
                        <span className="ml-3 font-bold text-white">
                          {product.name}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {product.price}đ
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-circle text-orange-500 mr-2"></i>
                        <span className="bg-saveBg rounded-[10px] px-3 py-[2px] block text-center overflow-hidden w-[50px]">
                          {product.quantity}
                        </span>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="py-3 px-5 bg-orange-400 rounded-[5px]"
                        >
                          <EditIcon />
                        </button>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          onClick={() =>
                            deleteProduct(product.id, product.name)
                          }
                          className="py-3 px-5 bg-red-500 rounded-[5px]"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex">
                          <button
                            onClick={() => handleViewDetail(product?.id)}
                            className="bg-pink-700 rounded-[10px] px-3 py-[2px] cursor-pointer"
                          >
                            <BsEye className="leading-[0px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {products?.length === 0 && (
              <div className="text-white text-xl text-center">
                Chưa có sản phẩm
              </div>
            )}
            {!products && (
              <LoadingSkeleton
                columns={1}
                height={50}
                count={8}
                columnRow={4}
              />
            )}
          </div>
          <PaginationComponent
            totalPages={pagination?.tolalPages}
            pageCurrent={pagination?.current}
            onPageChange={handlePageChange}
          />
        </div>
        {product && <ModalProductEdit data={product} setRender={setRender} />}
        {product && <ModalTest data={product} />}
        {isLoading && <LoadingSpinner />}
      </LayoutAdmin>
    </>
  );
}
export default dynamic(() => Promise.resolve(Products), { ssr: false });
