/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logo } from "@/assets";
import { signIn } from "@/services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  type LoginInputs = {
    email: string;
    password: string;
  };
  const LoginSchema = yup.object({
    email: yup
      .string()
      .email("This email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
        message:
          "Password must have at least 6 characters, one symbol, one number, and one uppercase letter.",
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(LoginSchema) as Resolver<LoginInputs, any>,
    mode: "onTouched",
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await signIn({
      dispatch,
      setLoading,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-full flex flex-col items-center pt-[20vh] min-h-screen">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex flex-col rounded-xl border border-slate-200 p-10 w-11/12 msm:w-[80%] sm:w-[70%] md:w-[50%] mlg:w-[40%] lg:w-[35%] 2xl:w-[28%] bg-white items-center">
        <img src={Logo} alt="Logo" className="w-24" />
        <span className="text-2xl my-1"> XWZ LTD</span>
        <span className="my-4 ">
          Don't have an account yet?{" "}
          <Link to={"/auth/signup"} className="text-primary-blue">
            Create One
          </Link>
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-3 w-full flex flex-col items-center"
        >
          <div className="w-full my-2">
            <label className="text-sm font-medium leading-none text-gray-800">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="johndoe@gmail.com"
            />
            {errors.email && (
              <span className="text-red-400 text-[16px]">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="w-full my-2">
            <label className="text-sm font-medium leading-none text-gray-800">
              Password
            </label>
            <div className="relative flex items-center justify-center">
              <input
                aria-label="enter Password"
                role="input"
                type={showPassword ? "text" : "password"}
                className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                placeholder="Enter password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/,
                })}
              />
              <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setShowPassword((cur) => !cur)}
                >
                  <path
                    d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                    fill="#71717A"
                  />
                </svg>
              </div>
            </div>
            {errors.password && (
              <span className="text-red-400 text-[16px]">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`${
              loading ? "bg-primary-blue/70" : "bg-primary-blue"
            } my-4 text-white w-44 flex justify-center px-6 py-3 rounded-lg`}
          >
            {loading ? (
              <BiLoaderAlt className="animate-spin " size={25} />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
