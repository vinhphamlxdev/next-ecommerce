import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import signUpbg from "@/assets/signup.jpg";
import Image from "next/image";
import { styled } from "styled-components";
import Input from "@/Admin/components/Input";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { signUpUserFn } from "@/service/authApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "@/Admin/components/Loading";
import useDisabled from "@/hooks/useDisabled";
import { useRouter } from "next/router";
import { IUser } from "@/types/authInterface";
import { useStateContext } from "@/context";
import notification from "@/utils/notification";
type FormStateType = Omit<IUser, "id">;
export default function SignUp() {
  const { dispatch, state } = useStateContext();
  const router = useRouter();
  const currentUser = state.authUser;

  // ? Calling the Register Mutation
  const { mutate, isLoading, data, isSuccess, mutateAsync } = useMutation(
    (userData: any) => signUpUserFn(userData),
    {
      onSuccess(data: any) {
        dispatch({ type: "SIGN_UP", payload: data?.user });
        signupFormik.resetForm();
      },
      onError(error: any) {
        notification(error?.response.data, "error");
        console.log("loi ne:", error);
      },
    }
  );

  const signupFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Họ tên là bắt buộc"),
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
      if (!values) {
        return;
      }
      const result = await mutateAsync(values);
      console.log(result);
      if (result) {
        toast.success("Đăng kí tài khoản thành công");
        router.push("/client/home");
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  React.useEffect(() => {
    if (currentUser) {
      router.push("/client/home");
    }
  }, []);
  const { isDisabled, disabledStyle } = useDisabled(isLoading);
  return (
    <div className="inset-0 bg-[#ffcad4] bg-signup gap-x-5">
      {isLoading && <LoadingSpinner />}
      <div className="wrapper-layout section">
        <div className="flex h-screen justify-center items-center">
          <div className="px-4 shadow-md py-6 flex flex-col w-[450px] sign-up-form  rounded-md bg-[#fff]">
            <button className="text-secondary text-4xl font-semibold text-center">
              Đăng Kí
            </button>
            <form
              onSubmit={signupFormik.handleSubmit}
              className="flex flex-col gap-y-4 mt-4"
            >
              <div className="relative">
                <div className="form-field">
                  <Input
                    id="fullName"
                    isCheckout
                    data={signupFormik.values.fullName}
                    setData={signupFormik.handleChange}
                    placeholder="Họ và tên"
                    error={signupFormik.errors.fullName}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="form-field">
                  <Input
                    id="email"
                    isCheckout
                    data={signupFormik.values.email}
                    setData={signupFormik.handleChange}
                    placeholder="Email"
                    error={signupFormik.errors.email}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="form-field">
                  <Input
                    id="password"
                    type="password"
                    isCheckout
                    data={signupFormik.values.password}
                    setData={signupFormik.handleChange}
                    placeholder="Password"
                    error={signupFormik.errors.password}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isDisabled}
                style={disabledStyle}
                className="h-[50px] bg-bgCheckout whitespace-nowrap w-full text-white font-light rounded-md text-base undefined"
              >
                Đăng Kí
              </button>

              <div className="mt-3 flex items-center gap-x-3">
                <span className="text-textPrimary font-light">
                  Bạn đã có tài khoản?
                </span>
                <Link
                  className="italic text-blue-500 text-sm cursor-pointer underline font-light"
                  href="/client/signin"
                >
                  Đăng Nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
