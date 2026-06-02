import { useAuth } from "../../context/AuthContext";

function AccountSettings() {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
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

      <button
        onClick={handleLogout}
        className="
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