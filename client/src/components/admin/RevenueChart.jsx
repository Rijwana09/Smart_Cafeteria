import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getRevenueChart } from "../../services/adminService";

function RevenueChart() {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChart = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getRevenueChart(user.token);

        setData(result);
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to load revenue data";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [user.token]);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  const maxRevenue = Math.max(1, ...data.map((d) => d.revenue));

  return (
    <div
      className="
      bg-white
      p-6
      rounded-2xl
      shadow-lg
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Revenue — Last 7 Days
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : totalRevenue === 0 ? (
        <p className="text-gray-500">
          No orders placed in the last 7 days yet — the chart will fill in
          as orders come through.
        </p>
      ) : (
        <div className="flex items-end justify-between gap-3 h-56">
          {data.map((day) => {
            const heightPct = (day.revenue / maxRevenue) * 100;

            const label = new Date(
              `${day.date}T00:00:00`
            ).toLocaleDateString(undefined, {
              weekday: "short",
            });

            return (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <span className="text-xs text-gray-500 mb-1">
                  ₹{day.revenue}
                </span>

                <div
                  className="w-full bg-amber-500 rounded-t-md min-h-[4px]"
                  style={{
                    height: `${Math.max(heightPct, 3)}%`,
                  }}
                  title={`₹${day.revenue} · ${day.orders} orders`}
                />

                <span className="text-xs text-gray-500 mt-2">{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RevenueChart;
