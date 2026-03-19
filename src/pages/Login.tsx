import LinkArrow from "../components/LinkArrow";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.ts";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const send = async (data: FormData) => {
    console.log(data);
    const error = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      reset();
    }

    navigate("/");
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center bg-[#f5f7fA]">
      <div className="w-96 p-4 pb-0 rounded-xl border border-gray-200 bg-[#f7f5fA] shadow-md flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
            className="rounded-2xl"
          />
          <h1 className="text-[24px] font-semibold">Welcome back</h1>
          <p className="text-sm text-[#657081]">
            Please enter your credentials to login
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(send)}>
          <div>
            <label htmlFor="email" className="text-sm text-[#181D25] mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="border w-full border-gray-300 bg-[#EAEDF1] rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-black-200"
              {...register("email", {
                required: "Email required",
              })}
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
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
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
          <button
            type="submit"
            className="bg-[#279B74] text-white rounded-md px-3 py-2 hover:bg-[#278B75] transition-colors font-semibold"
          >
            {" "}
            Login{" "}
          </button>
        </form>

        <p className="text-[#657081] p-5 text-sm">
          Don&#39;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#279B74] hover:underline hover:cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
      <LinkArrow href="/">Home</LinkArrow>
    </div>
  );
}
