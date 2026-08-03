import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../services/orderService";

function StatsCards() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    spent: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const orders = await getMyOrders(user.token);

        const completed = orders.filter(
          (o) => o.orderStatus === "Delivered"
        ).length;

        const pending = orders.filter(
          (o) => !["Delivered", "Cancelled"].includes(o.orderStatus)
        ).length;

        const spent = orders
          .filter((o) => o.orderStatus !== "Cancelled")
          .reduce((sum, o) => sum + o.totalAmount, 0);

        setStats({
          total: orders.length,
          completed,
          pending,
          spent,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.token]);

  const cards = [
    { title: "Total Orders", value: stats.total },
    { title: "Completed", value: stats.completed },
    { title: "Pending", value: stats.pending },
    { title: "Spent", value: `₹${stats.spent}` },
  ];

  return (
    <div
      className="
      grid
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >
      {cards.map((item) => (
        <div
          key={item.title}
          className="
          bg-white
          shadow-lg
          rounded-2xl
          p-6
          "
        >
          <h3 className="text-gray-500">
            {item.title}
          </h3>

          <p
            className="
            text-3xl
            font-bold
            mt-2
            "
          >
            {loading ? "—" : item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
