import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { updateProfile } from "../../services/userService";

function AccountSettings() {

  const { user, logout, login } = useAuth();
  const { clearCart } = useCart();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    logout();
    clearCart();
    window.location.href = "/";
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = { name, email };

      if (password) payload.password = password;

      const updated = await updateProfile(payload, user.token);

      // Keep the auth token, refresh the profile fields we just changed.
      login({ ...user, ...updated });

      setPassword("");

      toast.success("Profile updated.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Account Settings
      </h2>

      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            New Password (leave blank to keep current)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="
          bg-amber-500
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-amber-600
          "
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="
        mt-6
        bg-red-500
        text-white
        px-6
        py-3
        rounded-xl
        "
      >
        Logout
      </button>
    </div>
  );
}

export default AccountSettings;
