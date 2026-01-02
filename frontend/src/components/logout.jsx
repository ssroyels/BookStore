import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Logout = () => {
  const { logout } = useAuth(); // ✅ correct
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );
    if (!confirmLogout) return;

    try {
      setLoading(true);

      // 🔌 Backend logout (optional but pro)
      await axios.post(
        `${API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );

      // 🧹 Centralized logout
      logout();

      toast.success("Logged out successfully 👋");

      // 🚀 Smooth redirect
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="
        px-4 py-2 rounded-lg text-white font-medium
        bg-red-500 hover:bg-red-600
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default Logout;
