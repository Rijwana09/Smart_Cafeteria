import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getAllOrders } from "../../services/adminService";

function RecentOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(user.token);

        setOrders(data.slice(0, 5));
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to load recent orders"
        );
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
      p-6
      rounded-2xl
      shadow-lg
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
        "
      >
        Recent Orders
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t"
              >
                <td>#{order._id.slice(-6)}</td>
                <td>{order.customerName}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentOrders;
