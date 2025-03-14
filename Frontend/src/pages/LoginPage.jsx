import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast, { Toaster } from "react-hot-toast";
import { Beer, Eye, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required!");
    if (!formData.password) return toast.error("password is required!");
    if (formData.password.length < 6)
      return toast.error("password shoud be greater than length 6!");

    return true;
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };
  return (
    <>
      <Toaster />
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* leftSide */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
                >
                  <Beer />
                </div>
                <h1 className="text-2xl font-bold mt-2">Log In</h1>
                <p className="text-base-content/60">
                  Get started again with your account
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmitForm} className="space-y-6">
              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>

              <div className="form-control">
                <div className="relative">
                  <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="size-4 text-gray-500" />
                  </div>

                  <input
                    type={isShowPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-8"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <EyeOff className="size-5 text-gray-500" />
                    ) : (
                      <Eye className="size-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <button
                className="btn btn-soft w-full"
                type="submit"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  "Log In"
                )}
              </button>
            </form>
            <div className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                SignUp
              </Link>
            </div>
          </div>
        </div>

        {/* RightSide */}
        <div className="flex flex-col justify-center items-center p-6 ">
          <h1 className="text-center text-3xl mb-10">
            Welcome to Our Community!
          </h1>
          <Loader />
          <h1 className="text-center text-3xl mt-10">Have fun Chilling Out!</h1>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
