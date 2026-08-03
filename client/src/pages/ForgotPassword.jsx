import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await forgotPassword(email);

      setSent(true);

      // No email service is configured in this project, so the backend
      // returns the reset link directly for local/dev testing.
      if (data.resetUrl) {
        setDevResetUrl(data.resetUrl);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>

        <p className="text-gray-500 mb-6">
          Enter your account email and we'll generate a reset link.
        </p>

        {sent ? (
          <div>
            <p className="text-green-600 mb-4">
              If that email is registered, a reset link has been generated.
            </p>

            {devResetUrl && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                <p className="font-semibold mb-2">
                  Dev mode — no email service is configured, so here's your link:
                </p>

                <Link
                  to={devResetUrl}
                  className="text-amber-600 underline break-all"
                >
                  {window.location.origin}{devResetUrl}
                </Link>
              </div>
            )}

            <Link to="/login" className="block mt-6 text-amber-500">
              ← Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 text-white py-3 rounded-xl hover:bg-amber-600"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <Link to="/login" className="block text-center text-amber-500">
              ← Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
