import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  LogOut,
} from "lucide-react";

function AdminSidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      icon: ShoppingBag,
    },
    {
      name: "Users",
      icon: Users,
    },
    {
      name: "Inventory",
      icon: Package,
    },
    {
      name: "Reports",
      icon: BarChart3,
    },
  ];

  return (
    <aside
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
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
        {menu.map((item) => (
          <button
            key={item.name}
            className="
            flex
            items-center
            gap-3
            w-full
            p-3
            rounded-lg
            hover:bg-amber-50
            "
          >
            <item.icon size={20} />
            {item.name}
          </button>
        ))}
      </div>

      <button
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