import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { adminLogin } from "../services/adminAuthService";

import {useAuth} from "../context/AuthContext";
function AdminLogin() {
  const navigate = useNavigate();

  const { login } = useAuth();

  

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await adminLogin(
        formData.email,
        formData.password
      );

      login(data);

      toast.success(
        "Admin Login Successful"
      );

      navigate("/admin");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      "
    >
      <div
        className="
        bg-white
        w-full
        max-w-md
        rounded-2xl
        shadow-xl
        p-8
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-8
          "
        >
          Admin Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <button
            disabled={loading}
            className="
            w-full
            bg-amber-500
            hover:bg-amber-600
            text-white
            py-3
            rounded-lg
            font-semibold
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;