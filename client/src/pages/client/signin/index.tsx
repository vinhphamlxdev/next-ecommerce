import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import Image from "next/image";
import { styled } from "styled-components";
import Input from "@/Admin/components/Input";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useStateContext } from "@/context";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { IFormLogin } from "@/types/authInterface";
import useDisabled from "@/hooks/useDisabled";
import { LoadingSpinner } from "@/Admin/components/Loading";
import { useGlobalStore } from "@/store/globalStore";
import notification from "@/utils/notification";
import { loginUser } from "@/service/authApi";
export default function SignIn() {
  const router = useRouter();
  const { dispatch, state } = useStateContext();
  const { showPassword, setShowPassword } = useGlobalStore();
  const currentUser = state.authUser;
  const { mutate, isLoading, data, mutateAsync } = useMutation(
    (userData: IFormLogin) => loginUser(userData),
    {
      onSuccess(data: any) {
        console.log(data);
        dispatch({ type: "LOG_IN", payload: data.user });
        signInFormik.resetForm();
        toast.success("Đăng nhập thành công");
        router.push("/client/home");
      },
      onError(error: any) {
        notification(error?.response.data, "error");
      },
    }
  );
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
      if (!values) {
        return;
      }
      mutateAsync(values);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  React.useEffect(() => {
    if (currentUser) {
      router.push("/client/home");
    }
  }, [currentUser]);
  const { isDisabled, disabledStyle } = useDisabled(isLoading);
  return (
    <div className="inset-0 bg-[#ffcad4] bg-signup gap-x-5">
      {isLoading && <LoadingSpinner />}
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
                <div className="form-field relative">
                  <Input
                    id="password"
                    type={`${showPassword ? "text" : "password"}`}
                    isCheckout
                    data={signInFormik.values.password}
                    setData={signInFormik.handleChange}
                    placeholder="Password"
                    error={signInFormik.errors.password}
                  />
                  <i
                    onClick={() => setShowPassword()}
                    className={`bi absolute ${
                      showPassword ? "bi-eye" : "bi-eye-slash"
                    }  right-2 text-base cursor-pointer ${
                      signInFormik.errors.password ? "top-5" : "top-2/4"
                    }  -translate-y-2/4`}
                  ></i>
                </div>
              </div>

              <button
                disabled={isDisabled}
                style={disabledStyle}
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
