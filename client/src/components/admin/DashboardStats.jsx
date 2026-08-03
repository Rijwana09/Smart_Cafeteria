import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

import StatCard from "./StatCard";
import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/adminService";

function DashboardStats() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats(user.token);

        setStats(data);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to load dashboard stats"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.token]);

  const cards = [
    {
      id: 1,
      title: "Total Orders",
      value: stats?.totalOrders ?? 0,
    },
    {
      id: 2,
      title: "Revenue",
      value: `₹${stats?.totalRevenue ?? 0}`,
    },
    {
      id: 3,
      title: "Users",
      value: stats?.totalUsers ?? 0,
    },
    {
      id: 4,
      title: "Foods",
      value: stats?.totalFoods ?? 0,
    },
  ];

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} height={100} borderRadius={16} />
        ))}
      </div>
    );
  }

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
        <StatCard
          key={item.id}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
}

export default DashboardStats;
