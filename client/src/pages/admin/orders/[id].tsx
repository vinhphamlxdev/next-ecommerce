import * as React from "react";
import LayoutAdmin from "@/Admin/components/layout";
import { useRouter } from "next/router";
import { IOrder } from "@/types/interface";
import formatVnd from "@/utils/formatVnd";
import getCreateDate from "@/utils/getCreateDate";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@/Admin/components/Loading";
import dynamic from "next/dynamic";
import { getOrder } from "@/pages/api/OrderApi";

function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id as string),
    enabled: id !== undefined,
    onSuccess: (data) => {
      console.log("order detail:", data);
    },
    onError: (err: any) => {
      toast.error("Có lỗi", err);
    },
  });

  return (
    <LayoutAdmin>
      {isLoading && <LoadingSpinner />}
      <div className="mt-7  mx-5">
        <div className="flex flex-col bg-white">
          {data?.order && data?.order?.totalPrice ? (
            <h4 className="py-2 px-4 text-[30px]">
              Tổng tiền: {formatVnd(data?.order?.totalPrice.toString())} VND
            </h4>
          ) : (
            <></>
          )}

          <div className="py-2 px-4">
            <div className="grid grid-cols-1 gap-y-4 gap-x-5">
              <div className="flex flex-col items-start text-[#5F5F5F]">
                <span className="mb-2 text-[15px]">Họ và tên</span>
                <input
                  className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                  disabled={true}
                  type="text"
                  defaultValue={data?.order?.fullName}
                  style={{ border: "1px solid rgb(217, 217, 217)" }}
                />
              </div>
              <div className="flex flex-col items-start text-[#5F5F5F]">
                <span className="mb-2 text-[15px]">Số điện thoại</span>
                <input
                  className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                  disabled={true}
                  type="text"
                  defaultValue={data?.order?.phoneNumber}
                  style={{ border: "1px solid rgb(217, 217, 217)" }}
                />
              </div>
              <div className="flex flex-col items-start text-[#5F5F5F]">
                <span className="mb-2 text-[15px]">Địa chỉ</span>
                <input
                  className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                  type="text"
                  disabled={true}
                  defaultValue={data?.order?.address}
                  style={{ border: "1px solid rgb(217, 217, 217)" }}
                />
              </div>
              <div className="flex flex-col items-start text-[#5F5F5F]">
                <span className="mb-2 text-[15px]">Trạng thái</span>
                <input
                  className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                  disabled={true}
                  type="text"
                  defaultValue="Đang xử lý"
                  style={{ border: "1px solid rgb(217, 217, 217)" }}
                />
              </div>
              <div className="flex flex-col items-start text-[#5F5F5F]">
                <span className="mb-2 text-[15px]">Ngày đặt hàng</span>
                {data?.order && data?.order.createdAt ? (
                  <input
                    className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                    disabled={true}
                    type="text"
                    defaultValue={getCreateDate(data?.order?.createdAt)}
                    style={{ border: "1px solid rgb(217, 217, 217)" }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="flex gap-y-4 flex-col">
                <span className="text-[#5F5F5F] text-[15px]">
                  Sản phẩm đã đặt
                </span>

                <div className="flex flex-col gap-y-3">
                  {data?.order?.orderDetails?.length > 0 &&
                    data?.order?.orderDetails?.map(
                      (detail: any, index: number) => {
                        console.log(detail);
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-start text-[#5F5F5F]"
                          >
                            <div
                              className="bg-[#F5F5F1] flex flex-col w-full py-2 px-1 text-[14px] rounded-[5px]"
                              style={{ border: "1px solid rgb(217, 217, 217)" }}
                            >
                              <p className="my-1">
                                Tên sản phẩm: {detail?.product?.name}
                              </p>

                              <p className="my-1">
                                Màu sắc: {detail?.color?.colorName}
                              </p>
                              <p className="my-1">
                                Kích cỡ: {detail?.size?.name}
                              </p>
                              <p className="my-1">
                                Giá sản phẩm:{" "}
                                {formatVnd(detail?.price.toString())} VND
                              </p>

                              <p className="my-1">
                                Số lượng đã đặt: {detail?.amount}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
export default dynamic(() => Promise.resolve(OrderDetail), { ssr: false });
