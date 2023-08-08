import Swal from "sweetalert2";
import { DeleteIcon } from "@/components/Icons/AppIcon";
import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFilters, IProductFilters } from "@/types/interface";
import { toast } from "react-toastify";
import { deleteProduct } from "@/pages/api/ProductApi";

export interface IDeleteProductButtonProps {
  productId: number;
  filters: IProductFilters;
  name: string;
}

export default function DeleteProductButton({
  productId,
  filters,
  name,
}: IDeleteProductButtonProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products", filters] });
    },
    onError: (err: any) => {
      toast.error(`${err?.response?.data}`);
    },
  });
  const handleDeleteProduct = async (productId: number, name: string) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: `Bạn muốn xóa sản phẩm: ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      mutate(productId);
    }
  };
  return (
    <button
      onClick={() => handleDeleteProduct(productId, name)}
      className="py-3 px-5 bg-red-500 rounded-[5px]"
    >
      <DeleteIcon />
    </button>
  );
}
