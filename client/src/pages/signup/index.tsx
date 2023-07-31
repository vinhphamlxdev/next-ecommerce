import { IMG_SRC } from "@/common/constanst";
import * as React from "react";
import signUpbg from "@/assets/signup.jpg";
import Image from "next/image";
import { styled } from "styled-components";
import Input from "@/Admin/components/Input";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "@/Admin/components/Loading";
import useDisabled from "@/hooks/useDisabled";
import { useRouter } from "next/router";
import { IUser } from "@/types/authInterface";
import { useAuthContext } from "@/context/useAuthContext";
import notification from "@/utils/notification";
import { useGlobalStore } from "@/store/globalStore";
import { registerUser } from "@/pages/api/authApi";
type FormStateType = Omit<IUser, "id">;
export default function SignUp() {
  const { dispatch, state } = useAuthContext();
  const router = useRouter();
  const currentUser = state.authUser;
  const { showPassword, setShowPassword } = useGlobalStore();

  // ? Calling the Register Mutation
  const { mutate, isLoading, data, isSuccess, mutateAsync } = useMutation(
    (userData: any) => registerUser(userData),
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
      confirmPassword: "",
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
      confirmPassword: Yup.string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không trùng khớp"),
    }),
    onSubmit: async (values) => {
      if (!values) {
        return;
      }
      const { fullName, email, password } = values;
      const data = {
        fullName,
        email,
        password,
      };
      console.log(data);
      const result = await mutateAsync(data);
      console.log(result);
      if (result) {
        toast.success("Đăng kí tài khoản thành công");
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  React.useEffect(() => {
    if (currentUser) {
      router.push("/home");
    }
  }, [currentUser]);
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
                    type={`${showPassword ? "text" : "password"}`}
                    isCheckout
                    data={signupFormik.values.password}
                    setData={signupFormik.handleChange}
                    placeholder="Mật khẩu"
                    error={signupFormik.errors.password}
                  />
                  <i
                    onClick={() => setShowPassword()}
                    className={`bi absolute ${
                      showPassword ? "bi-eye" : "bi-eye-slash"
                    }  right-2 text-base cursor-pointer ${
                      signupFormik.errors.password ? "top-5" : "top-2/4"
                    }  -translate-y-2/4`}
                  ></i>
                </div>
              </div>
              <div className="relative">
                <div className="form-field">
                  <Input
                    id="confirmPassword"
                    type={`${showPassword ? "text" : "password"}`}
                    isCheckout
                    data={signupFormik.values.confirmPassword}
                    setData={signupFormik.handleChange}
                    placeholder="Xác nhận mật khẩu"
                    error={signupFormik.errors.confirmPassword}
                  />
                  <i
                    onClick={() => setShowPassword()}
                    className={`bi absolute ${
                      showPassword ? "bi-eye" : "bi-eye-slash"
                    }  right-2 text-base cursor-pointer ${
                      signupFormik.errors.password ? "top-5" : "top-2/4"
                    }  -translate-y-2/4`}
                  ></i>
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
                  href="/signin"
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
