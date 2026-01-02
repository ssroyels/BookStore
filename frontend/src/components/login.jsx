import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Login = ({ onClose }) => {
  const { login } = useAuth(); // ✅ use context helper

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${API_URL}/user/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true, // 🍪 cookie-ready
        }
      );

      // 🔐 CENTRALIZED LOGIN
      login(res.data.user);

      toast.success("Login successful 🚀");

      reset();
      onClose?.();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box bg-base-100 rounded-xl shadow-xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-6">Welcome Back 👋</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-xs text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                px-6 py-2 rounded-lg bg-pink-500 text-white font-medium
                hover:bg-pink-600 transition disabled:opacity-50
              "
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <Link
              to="/signup"
              className="text-sm text-blue-500 hover:underline"
              onClick={onClose}
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Login;
