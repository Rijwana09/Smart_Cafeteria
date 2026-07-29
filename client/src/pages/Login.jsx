import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  loginUser,
} from "../services/authService";

import {useAuth} from "../context/AuthContext";

function Login() {

  const navigate =
    useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
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

      try {

        setLoading(true);

        const data =
          await loginUser(
            email,
            password
          );

        login(data);

        navigate("/dashboard");

      } catch (err) {

        setError(
          err.response?.data
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
      bg-gradient-to-br
      from-amber-50
      to-orange-100
      px-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-xl
        p-8
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
            Welcome Back
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Login to Smart Cafeteria
          </p>

        </div>

        {error && (
          <div
            className="
            mt-4
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

            <div
              className="
              relative
              "
            >
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
                pr-14
                focus:outline-none
                focus:ring-2
                focus:ring-amber-500
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                absolute
                right-4
                top-3
                text-gray-500
                "
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          <div
            className="
            flex
            justify-between
            items-center
            text-sm
            "
          >
            <label
              className="
              flex
              items-center
              gap-2
              "
            >
              <input
                type="checkbox"
              />

              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="
              text-amber-500
              "
            >
              Forgot Password?
            </Link>

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
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        <div
          className="
          text-center
          mt-6
          "
        >
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
              text-amber-500
              font-semibold
              "
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;