import LinkArrow from "../components/LinkArrow";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { supabase } from "../lib/supabase.ts";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: "onChange" });

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { username: data.username },
      },
    });

    if (error) {
      setIsError(true);
      setMessage(error.message);
      return;
    }

    setIsError(false);
    setMessage("Check your email to confirm your account!");
    reset();
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center bg-[#f5f7fA]">
      <div className="w-96 p-4 pb-0 rounded-xl border border-gray-200 bg-[#f7f5fA] shadow-md flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <img
            src="./logo.png"
            alt="Logo"
            width={70}
            height={70}
            className="rounded-2xl"
          />
          <h1 className="text-[24px] font-semibold">Create account</h1>
          <p className="text-sm text-[#657081]">Join the conversation today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="text-sm text-[#181D25] mb-2">
              Username
            </label>
            <input
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                  message:
                    "Username must be alphanumeric and start with a letter",
                },
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username cannot exceed 20 characters",
                },
              })}
              type="text"
              id="username"
              placeholder="Create a username"
              className="border w-full border-gray-300 bg-[#EAEDF1] rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-black-200"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-[#181D25] mb-2">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="border w-full border-gray-300 bg-[#EAEDF1] rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-black-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm text-[#181D25] mb-2">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Password cannot exceed 100 characters",
                },
                validate: {
                  hasUppercase: (v) =>
                    /[A-Z]/.test(v) || "Must contain an uppercase letter",
                  hasLowercase: (v) =>
                    /[a-z]/.test(v) || "Must contain a lowercase letter",
                  hasNumber: (v) => /[0-9]/.test(v) || "Must contain a number",
                  hasSpecialChar: (v) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                    "Must contain a special character",
                },
              })}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="border w-full border-gray-300 bg-[#EAEDF1] rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-black-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 -translate-y-1/2 text-gray-500 hover:text-gray-700 outline-none"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="Cpassword" className="text-sm text-[#181D25] mb-2">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showCPassword ? "text" : "password"}
              id="Cpassword"
              placeholder="Confirm Password"
              className="border w-full border-gray-300 bg-[#EAEDF1] rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-black-200"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowCPassword(!showCPassword)}
              className="absolute right-3 top-11 -translate-y-1/2 text-gray-500 hover:text-gray-700 outline-none"
            >
              {showCPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#279B74] text-white rounded-md px-3 py-2 hover:bg-[#278B75] transition-colors font-semibold"
          >
            Create
          </button>
        </form>

        {message && (
          <p
            className={`text-sm text-center px-4 py-2 ${isError ? "text-red-500" : "text-[#279B74]"}`}
          >
            {message}
          </p>
        )}

        <p className="text-[#657081] p-5 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#279B74] hover:underline hover:cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </div>
      <LinkArrow href="/">Home</LinkArrow>
    </div>
  );
}
