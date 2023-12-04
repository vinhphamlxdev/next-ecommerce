import * as React from "react";
import LayoutAdmin from "@/Admin/components/layout";
import { useRouter } from "next/router";
import { IOrder } from "@/types/interface";
import formatVnd from "@/utils/formatVnd";
import getCreateDate from "@/utils/getCreateDate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@/Admin/components/Loading";
import dynamic from "next/dynamic";
import { getOrder, updateStatusOrder } from "@/pages/api/OrderApi";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import LoadingButton from "@/Admin/components/Loading/LoadingButton";
import useDisabled from "@/hooks/useDisabled";
import { BiSave } from "react-icons/bi";
import { OrdersStatus } from "@/enums/OrdersStatus";

function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [status, setStatus] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id as string),
    enabled: id !== undefined,
    onSuccess: (data) => {
      setStatus(data?.order?.status);
      // console.log("order detail:", data);
    },
    onError: (err: any) => {
      if (
        err &&
        (err?.response?.status === 401 || err?.response?.status === 403)
      ) {
        toast.error(`Không có quyền truy cập!`);
        router.push(`/home`);
      }
    },
  });

  const { mutate, isLoading: isLoadingChangeStatus } = useMutation({
    mutationFn: (status: string) => updateStatusOrder(id as string, status),
    onSuccess: () => {
      toast.success("Cập nhật thành công");
    },
    onError: () => {
      toast.error("Có lỗi");
    },
  });
  const handleUpdateStatusOrder = () => {
    mutate(status);
  };
  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setStatus(value);
  };
  const { disabledStyle, isDisabled } = useDisabled(isLoadingChangeStatus);
  return (
    <LayoutAdmin>
      {isLoading && <LoadingSpinner />}
      <div className="mt-7 order-detail-page  mx-5">
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
                                {formatVnd((detail?.price).toString())} VND
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
              <div className="flex flex-col gap-y-2 mt-3">
                <div className="flex flex-col items-start text-[#5F5F5F]">
                  <span className="text-[15px]">Trạng thái</span>
                </div>
                <FormControl>
                  <RadioGroup
                    value={status}
                    onChange={handleChangeStatus}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value={OrdersStatus.PENDING}
                      control={<Radio color="secondary" />}
                      label="Đang xử lý"
                    />
                    <FormControlLabel
                      value={OrdersStatus.DELIVERING}
                      control={<Radio color="warning" />}
                      label="Đang vận chuyển"
                    />
                    <FormControlLabel
                      value={OrdersStatus.CANCELED}
                      control={<Radio color="error" />}
                      label="Đã hủy"
                    />
                    <FormControlLabel
                      value={OrdersStatus.COMPLETED}
                      control={<Radio color="success" />}
                      label="Đã giao"
                    />
                  </RadioGroup>
                  <div className="save-status__btn">
                    <button
                      disabled={isDisabled}
                      style={disabledStyle}
                      type="submit"
                      onClick={handleUpdateStatusOrder}
                      className="add-category w-20   shadow-md  hover:opacity-80 transition-all bg-saveBg px-3 text-sm   py-2 rounded-md text-white gap-x-1 flex justify-center items-center"
                    >
                      {isDisabled ? (
                        <LoadingButton />
                      ) : (
                        <>
                          <BiSave></BiSave>
                          <span>Save</span>
                        </>
                      )}
                    </button>
                  </div>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
export default dynamic(() => Promise.resolve(OrderDetail), { ssr: false });
