import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const { clearCart } = useCart();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      name: "Orders",
      icon: ShoppingBag,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: Users,
      path: "/admin#users",
    },
    {
      name: "Inventory",
      icon: Package,
      path: "/admin/menu",
    },
    {
      name: "Reports",
      icon: BarChart3,
      path: "/admin#reports",
    },
  ];

  const handleLogout = () => {
    logout();
    clearCart();
    window.location.href = "/admin-login";
  };

  return (
    <aside
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      h-fit
      "
    >
      <h1
        className="
        text-2xl
        font-bold
        text-amber-500
        mb-8
        "
      >
        Admin Panel
      </h1>

      <div className="space-y-4">
        {menu.map((item) => {
          const isActive =
            item.path === location.pathname ||
            (item.path.startsWith(location.pathname) &&
              location.pathname !== "/");

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
              flex
              items-center
              gap-3
              w-full
              p-3
              rounded-lg
              hover:bg-amber-50
              ${isActive ? "bg-amber-50 text-amber-600 font-semibold" : ""}
              `}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        className="
        mt-10
        flex
        items-center
        gap-2
        text-red-500
        "
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
