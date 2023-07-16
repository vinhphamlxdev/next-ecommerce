import * as React from "react";
import Input from "@/Admin/components/Input";
import Button from "@/components/Button";
import { MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import slugify from "slugify";
import axios from "axios";
import { addressApi } from "@/service/AddressApi";
import { styled } from "styled-components";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import notification from "@/utils/notification";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import formatVnd from "@/utils/formatVnd";
import { IProduct } from "@/types/interface";
import calculateTotalPrice from "@/utils/calculateTotalPrice";
import { createOrder } from "@/service/OrderApi";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/Admin/components/Loading";
import useDisabled from "@/hooks/useDisabled";
const LayoutClient = dynamic(() => import("@/components/layout/LayoutMain"), {
  ssr: false,
});
export default function Checkout() {
  const { deleteAllCart } = useCartStore((state) => state);
  const [provinces, setProvinces] = React.useState<any>([]);
  const [districts, setDistricts] = React.useState<any>([]);
  const { cartItems } = useCartStore((state) => state);
  const router = useRouter();
  const checkoutFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      houseNumber: "",
      province: "",
      districtAddress: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Họ tên là bắt buộc"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      phoneNumber: Yup.string()
        .matches(/^\d{10,11}$/, "Vui lòng nhập số điện thoại hợp lệ!")
        .required("Số điện thoại là bắt buộc")
        .typeError("Vui lòng nhập đúng định dạng số điện thoại"),
      houseNumber: Yup.string().required("Số nhà tên đường là bắt buộc"),
      province: Yup.string().required("Vui lòng chọn tỉnh thành"),
      districtAddress: Yup.string().required("Vui lòng chọn quận huyện"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (!values) {
        return;
      }
      const productOrders = cartItems?.map((item) => {
        return {
          product: item.id,
          amount: item.quantity,
        };
      });
      const data = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: `${
          values.houseNumber +
          ", " +
          values.districtAddress +
          ", " +
          values.province
        }`,

        products: [...cartItems],
      };
      const response = await createOrder(data);
      if (response.status !== "success") {
        toast.error("Đặt hàng thất bại!");
      }
      toast.success("Đặt hàng thành công");
      deleteAllCart();
      router.push("/client/product");

      console.log(response);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const handleChooseCity = (event: any, item: any) => {
    setDistricts(item.districts);
  };
  React.useEffect(() => {
    if (!cartItems.length) {
      router.push("/client/product");
      toast.warning("Giỏ hàng đang trống");
    }
  }, []);
  React.useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await axios.get(addressApi.getAllAddress());
        if (response.data) {
          setProvinces(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProvinces();
  }, []);
  const priceShipping = 35000;
  const { isDisabled, disabledStyle } = useDisabled(
    checkoutFormik.isSubmitting
  );

  return (
    <div className="checkout-page pt-10 ">
      {checkoutFormik.isSubmitting && <LoadingSpinner />}
      <div className="wrapper-layout">
        <div className="checkout-layout">
          <h3 className="text-lg font-medium text-gray-600">
            Thông tin nhận hàng
          </h3>
          <div className="grid mt-10 grid-cols-2 gap-x-3">
            <form
              onSubmit={checkoutFormik.handleSubmit}
              className="flex flex-col gap-y-4"
            >
              <Input
                id="fullName"
                isCheckout
                data={checkoutFormik.values.fullName}
                setData={checkoutFormik.handleChange}
                placeholder="Họ và tên"
                error={checkoutFormik.errors.fullName}
              />
              <div className="grid grid-cols-2 gap-x-3">
                <Input
                  isCheckout
                  id="email"
                  data={checkoutFormik.values.email}
                  setData={checkoutFormik.handleChange}
                  placeholder="Email"
                  error={checkoutFormik.errors.email}
                />
                <Input
                  isCheckout
                  id="phoneNumber"
                  data={checkoutFormik.values.phoneNumber}
                  setData={checkoutFormik.handleChange}
                  placeholder="Số điện thoại"
                  error={checkoutFormik.errors.phoneNumber}
                />
              </div>
              <Input
                isCheckout
                id="houseNumber"
                data={checkoutFormik.values.houseNumber}
                setData={checkoutFormik.handleChange}
                placeholder="Số nhà tên đường"
                error={checkoutFormik.errors.houseNumber}
              />
              <div className="grid mt-4 grid-cols-2 gap-x-3">
                <div className="relative">
                  <span className="absolute left-0 text-xs font-light -top-4 text-textPrimary">
                    Chọn tỉnh/thành
                  </span>
                  <Select
                    value={checkoutFormik.values.province}
                    onChange={checkoutFormik.handleChange}
                    id="province"
                    name="province"
                    className="w-full"
                  >
                    {provinces.map((item: any, index: number) => {
                      return (
                        <MenuItem
                          onClick={(e) => handleChooseCity(e, item)}
                          key={item.code}
                          value={item.name}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
                <div className="relative">
                  <span className="absolute left-0 text-xs font-light -top-4 text-textPrimary">
                    Chọn quận/huyện
                  </span>
                  <Select
                    id="districtAddress"
                    name="districtAddress"
                    defaultValue=""
                    className="w-full"
                    value={checkoutFormik.values.districtAddress}
                    onChange={checkoutFormik.handleChange}
                  >
                    {districts.map((district: any, index: number) => {
                      return (
                        <MenuItem key={district.code} value={district.name}>
                          {district.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <span className="text-lg text-secondary">
                  Phương thức vận chuyển
                </span>
                <div className="flex items-center p-4 border border-gray-400 rounded-md gap-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                    <i className="text-4xl text-white bi leading-[0] bi-dot" />
                  </div>
                  <div className="flex items-center gap-x-4">
                    <img
                      src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=4"
                      alt=""
                    />
                    <span>Thanh toán khi giao hàng (COD)</span>
                  </div>
                </div>
              </div>
              <button
                disabled={isDisabled}
                style={disabledStyle}
                type="submit"
                className="py-4 font-medium bg-bgCheckout whitespace-nowrap w-full text-white  rounded-sm text-base"
              >
                HOÀN TẤT ĐƠN HÀNG
              </button>
              <Link
                href="/client/cart"
                className="text-bgCheckout text-sm font-medium hover:opacity-80"
              >
                <i className="bi bi-chevron-left"></i>
                <span> Quay về giỏ hàng</span>
              </Link>
            </form>
            {/*  */}
            <div className="order-information flex flex-col gap-y-4 border border-b-0 border-gray-300 p-3 bg-[#fafafa]">
              <div className="order-list py-3 pr-3  flex flex-col gap-y-4 h-[250px] has-scrollbar">
                {cartItems.length > 0 &&
                  cartItems.map((product) => {
                    const {
                      colors,
                      id,
                      imageUrls,
                      name,
                      price,
                      quantity,
                      sizes,
                    } = product;
                    return (
                      <div
                        key={id}
                        className="flex items-center px-2 py-2 bg-white border-b border-gray-300 rounded-md"
                      >
                        <div className="relative">
                          <div className="relative overflow-hidden bg-white border border-gray-300 rounded-md w-14 h-14">
                            <img
                              className="object-cover w-full rounded-md"
                              src={imageUrls[0]}
                              alt=""
                            />
                          </div>
                          <span className="absolute -top-[10px] -right-2 w-5 h-5 flex justify-center items-center text-sm font-light leading-[0] text-white bg-bgCheckout rounded-full ">
                            2
                          </span>
                        </div>
                        <div className="flex items-center justify-between w-full pl-4">
                          <div className="relative ">
                            <span className="text-base font-light text-textPrimary">
                              {name}
                            </span>
                            <p className="text-xs font-light text-textColor"></p>
                          </div>
                          <span className="text-sm font-light text-textPrimary">
                            {formatVnd(price.toString())}₫
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="py-5 border-t border-b border-gray-300 place-order">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-light text-secondary">
                    Tạm Tính
                  </span>
                  <p className="text-sm font-light text-textPrimary">
                    {formatVnd(calculateTotalPrice(cartItems).toString())}₫
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-light text-secondary">
                    Phí vận chuyển
                  </span>
                  <p className="text-sm font-light text-textPrimary">
                    {formatVnd(priceShipping.toString())}₫
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-light text-secondary">
                  Tổng cộng
                </span>
                <div className="flex items-center gap-x-3">
                  <span className="text-sm font-light text-gray-400">VND</span>
                  <span className="text-xl font-medium text-secondary">
                    {formatVnd(
                      (
                        calculateTotalPrice(cartItems) + priceShipping
                      ).toString()
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
