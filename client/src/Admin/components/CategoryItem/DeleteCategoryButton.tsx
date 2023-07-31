import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/pages/api/CategoryApi";
import { toast } from "react-toastify";
import { IFilters } from "@/types/interface";
import Swal from "sweetalert2";

export interface IDeleteCategoryButtonProps {
  categoryId: number;
  filters: IFilters;
}

export default function DeleteCategoryButton({
  categoryId,
  filters,
}: IDeleteCategoryButtonProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Xóa danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categorys", filters] });
    },
    onError: (err) => {
      toast.error(`Có lỗi:${err}`);
    },
  });
  const handleDeleteCategory = async (categoryId: number) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa danh mục này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      mutate(categoryId);
    }
  };
  return (
    <button
      onClick={() => handleDeleteCategory(categoryId)}
      className="delete-category "
    >
      <i className="bi text-red-500 text-xl cursor-pointer bi-trash"></i>
    </button>
  );
}
