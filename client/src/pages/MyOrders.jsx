import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders, cancelOrder } from "../services/orderService";
import OrderCard from "../components/orders/OrderCard";
import toast from "react-hot-toast";

function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getMyOrders(
        user.token
      );

      setOrders(data);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId, user.token);

      toast.success("Order cancelled");

      fetchOrders();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to cancel order"
      );
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (orders.length === 0)
    return <h2 className="text-center py-20 text-2xl font-semibold">No Orders Found</h2>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onCancel={handleCancel}
          />
        ))}
      </div>

    </div>
  );
}

export default MyOrders;
