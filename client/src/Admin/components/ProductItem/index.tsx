import * as React from "react";
import { IFilters, IProduct } from "@/types/interface";
import Image from "next/image";
import formatVnd from "@/utils/formatVnd";
import { DeleteIcon, EditIcon } from "@/components/Icons/AppIcon";
import { BsEye } from "react-icons/bs";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useModalStore } from "@/store/modalStore";
import { getProduct, updateProduct } from "@/pages/api/ProductApi";
import ModalProductEdit from "../Modal/ModalProductEdit";
import ModalProductDetail from "../Modal/ModalProductDetail";
import DeleteProductButton from "../Modal/DeleteProductButton";

export interface IProductItemAdminProps {
  item: IProduct;
  filters: IFilters;
}

export default function ProductItemAdmin({
  item,
  filters,
}: IProductItemAdminProps) {
  const {
    name,
    colors,
    price,
    imageUrls,
    quantity,
    sizes,
    shortDescription,
    id,
    discount,
    delete: isDelete,
  } = item;
  const {
    setOpenEditProduct,
    setOpenDetailProduct,
    isOpenEditP,
    isOpenDetailP,
  } = useModalStore();
  const [selectedProductId, setSelectedProductId] = React.useState<
    number | null
  >(null);

  const handleEditProduct = (id: number) => {
    setSelectedProductId(id);
    setOpenEditProduct(true);
  };
  const handleViewDetail = (id: number | any) => {
    setSelectedProductId(id);
    setOpenDetailProduct(true);
  };
  return (
    <>
      {isOpenEditP && selectedProductId ? (
        <ModalProductEdit
          setSelectedId={setSelectedProductId}
          isOpenEditP={isOpenEditP}
          productId={selectedProductId}
          filters={filters}
        />
      ) : (
        <></>
      )}
      {isOpenDetailP && selectedProductId ? (
        <ModalProductDetail
          setSelectedId={setSelectedProductId}
          isOpenDetailP={isOpenDetailP}
          productId={selectedProductId}
          filters={filters}
        />
      ) : (
        <></>
      )}
      <tr className="bg-gray-700 mt-2">
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <div className="relative  rounded-full">
            <Image
              className="rounded-full  w-14 h-14 flex-shrink-0 object-cover"
              width={100}
              height={100}
              src={imageUrls[0]}
              alt=""
            />
          </div>
          <span className="ml-3 font-bold text-white">{name}</span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {formatVnd(price.toString())}đ
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i className="fas fa-circle text-orange-500 mr-2"></i>
          <span className="bg-saveBg rounded-[10px] px-3 py-[2px] block text-center overflow-hidden w-[50px]">
            {quantity}
          </span>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <button
            onClick={() => handleEditProduct(id)}
            className="py-3 px-5 bg-orange-400 rounded-[5px]"
          >
            <EditIcon />
          </button>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <DeleteProductButton filters={filters} productId={id} name={name} />
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex">
            <button
              onClick={() => handleViewDetail(id)}
              className="bg-pink-700 rounded-[10px] px-3 py-[2px] cursor-pointer"
            >
              <BsEye className="leading-[0px]" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
