import { Link } from "react-router-dom";

function DashboardSidebar() {
  return (
    <aside
      className="
      bg-white
      shadow-lg
      rounded-2xl
      p-6
      h-fit
      "
    >
      <h2 className="text-2xl font-bold text-amber-500 mb-8">
        Dashboard
      </h2>

      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className="block hover:text-amber-500"
        >
          Overview
        </Link>

    <Link
      to="/my-orders"
      className="
      bg-amber-500
      text-white
      px-5
      py-3
      rounded-lg
      "
    >
      My Orders
    </Link>

        <Link
          to="/favorites"
          className="block hover:text-amber-500"
        >
          Favorites
        </Link>

        <Link
          to="/settings"
          className="block hover:text-amber-500"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}

export default DashboardSidebar;