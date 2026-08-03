import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../services/orderService";

function RecentOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(user.token);

        setOrders(data.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.token]);

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Recent Orders
        </h2>

        <Link to="/my-orders" className="text-amber-500 text-sm">
          View all →
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              to={`/orders/${order._id}`}
              key={order._id}
              className="
              flex
              justify-between
              border-b
              pb-3
              "
            >
              <div>
                <h3 className="font-semibold">
                  {order.orderItems[0]?.name}
                  {order.orderItems.length > 1 &&
                    ` +${order.orderItems.length - 1} more`}
                </h3>

                <p className="text-gray-500">
                  #{order._id.slice(-6)}
                </p>
              </div>

              <span
                className={
                  order.orderStatus === "Delivered"
                    ? "text-green-600 font-semibold"
                    : order.orderStatus === "Cancelled"
                    ? "text-red-500 font-semibold"
                    : "text-amber-500 font-semibold"
                }
              >
                {order.orderStatus}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentOrders;
