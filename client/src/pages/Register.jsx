import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  registerUser,
} from "../services/authService";

import {
  useAuth,
} from "../context/AuthContext";

function Register() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      if (
        password !==
        confirmPassword
      ) {
        return setError(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        const data =
          await registerUser({
            name,
            email,
            password,
          });

        login(data);

        navigate("/dashboard");

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
            "Registration Failed"
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
      bg-gradient-to-br
      from-amber-50
      to-orange-100
      px-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        w-full
        max-w-md
        "
      >
        <div className="text-center">

          <h1
            className="
            text-4xl
            font-bold
            text-amber-500
            "
          >
            Create Account
          </h1>

          <p
            className="
            mt-2
            text-gray-500
            "
          >
            Join Smart Cafeteria
          </p>

        </div>

        {error && (
          <div
            className="
            mt-5
            bg-red-100
            text-red-600
            p-3
            rounded-lg
            "
          >
            {error}
          </div>
        )}

        <form
          onSubmit={
            handleSubmit
          }
          className="
          mt-8
          space-y-5
          "
        >
          <div>

            <label
              className="
              block
              mb-2
              font-medium
              "
            >
              Full Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Enter Full Name"
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-500
              "
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-medium
              "
            >
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter Email"
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-500
              "
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-medium
              "
            >
              Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              value={
                password
              }
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Enter Password"
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-500
              "
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-medium
              "
            >
              Confirm Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm Password"
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-500
              "
            />

          </div>

          <div>

            <label
              className="
              flex
              items-center
              gap-2
              "
            >
              <input
                type="checkbox"
                onChange={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              />

              Show Password
            </label>

          </div>

          <button
            type="submit"
            disabled={
              loading
            }
            className="
            w-full
            bg-amber-500
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-amber-600
            transition
            "
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <div
          className="
          text-center
          mt-6
          "
        >
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="
              text-amber-500
              font-semibold
              "
            >
              Login
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

export default Register;