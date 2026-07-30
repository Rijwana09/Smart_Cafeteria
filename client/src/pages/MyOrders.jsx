import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../services/orderService";
import OrderCard from "../components/orders/OrderCard";

function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(
          user.token
        );

        setOrders(data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (orders.length === 0)
    return <h2>No Orders Found</h2>;

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
          />
        ))}
      </div>

    </div>
  );
}

export default MyOrders;