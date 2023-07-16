import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import Image from "next/image";
import { styled } from "styled-components";
import Input from "@/Admin/components/Input";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
export default function SignIn() {
  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      password: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
        ),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (!values) {
        return;
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <div className="inset-0 bg-[#ffcad4] bg-signup gap-x-5">
      <div className="wrapper-layout section">
        <div className="flex h-screen justify-center items-center">
          <div className="px-4 shadow-md py-6 flex flex-col w-[450px] sign-up-form  rounded-md bg-[#fff]">
            <h3 className="text-secondary text-4xl font-semibold text-center">
              Đăng Nhập
            </h3>
            <form
              onSubmit={signInFormik.handleSubmit}
              className="flex flex-col gap-y-4 mt-4"
            >
              <div className="relative">
                <div className="form-field">
                  <Input
                    id="email"
                    isCheckout
                    data={signInFormik.values.email}
                    setData={signInFormik.handleChange}
                    placeholder="Email"
                    error={signInFormik.errors.email}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="form-field">
                  <Input
                    id="password"
                    type="password"
                    isCheckout
                    data={signInFormik.values.password}
                    setData={signInFormik.handleChange}
                    placeholder="Password"
                    error={signInFormik.errors.password}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-[50px] bg-bgCheckout whitespace-nowrap w-full text-white font-light rounded-md text-base undefined"
              >
                Đăng Nhập
              </button>

              <div className="mt-3 flex items-center gap-x-3">
                <span className="text-textPrimary font-light">
                  Bạn chưa có tài khoản?
                </span>
                <Link
                  className="italic text-blue-500 text-sm cursor-pointer underline font-light"
                  href="/client/signup"
                >
                  Đăng Kí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
