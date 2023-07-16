import * as React from "react";
import LayoutAdmin from "@/Admin/components/layout";
import { getOrderDetail } from "@/service/OrderApi";
import { useRouter } from "next/router";
import { IOrder } from "@/types/interface";
import formatVnd from "@/utils/formatVnd";
import getCreateDate from "@/utils/getCreateDate";
export interface IOrderDetailProps {}

export default function OrderDetail(props: IOrderDetailProps) {
  const [order, setOrder] = React.useState<IOrder | any>();
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getOrderDetail(id);
        if (response && response?.order) {
          setOrder(response.order);
          console.log(response.order);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <LayoutAdmin>
      <div className="mt-7  mx-5">
        <div className="flex flex-col bg-white">
          {order && order.totalPrice ? (
            <h4 className="py-2 px-4 text-[30px]">
              Tổng tiền: {formatVnd(order?.totalPrice.toString())} VND
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
                  defaultValue={order?.fullName}
                  style={{ border: "1px solid rgb(217, 217, 217)" }}
                />
              </div>
              <div className="flex flex-col items-start text-[#5F5F5F]">
                <span className="mb-2 text-[15px]">Số điện thoại</span>
                <input
                  className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                  disabled={true}
                  type="text"
                  defaultValue={order?.phoneNumber}
                  style={{ border: "1px solid rgb(217, 217, 217)" }}
                />
              </div>
              <div className="flex flex-col items-start text-[#5F5F5F]">
                <span className="mb-2 text-[15px]">Địa chỉ</span>
                <input
                  className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                  type="text"
                  disabled={true}
                  defaultValue={order?.address}
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
                {order && order.createdAt ? (
                  <input
                    className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                    disabled={true}
                    type="text"
                    defaultValue={getCreateDate(order?.createdAt)}
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
                  {order?.products &&
                    order?.products?.map((product: any) => {
                      return (
                        <div
                          key={product?.id}
                          className="flex flex-col items-start text-[#5F5F5F]"
                        >
                          <div
                            className="bg-[#F5F5F1] w-full py-2 px-1 text-[14px] rounded-[5px]"
                            style={{ border: "1px solid rgb(217, 217, 217)" }}
                          >
                            <p className="my-1">
                              Tên sản phẩm: {product?.name}
                            </p>
                            <p className="my-1">
                              Giá sản phẩm:{" "}
                              {formatVnd(product?.price.toString())} VND
                            </p>

                            <p className="my-1">
                              Số lượng đã đặt: {product?.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
