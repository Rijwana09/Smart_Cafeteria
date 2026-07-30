import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between">

        <div>
          <h2 className="font-bold">
            Order #{order._id.slice(-6)}
          </h2>

          <p>
            {new Date(
              order.createdAt
            ).toLocaleString()}
          </p>

          <p>
            ₹{order.totalAmount}
          </p>

        </div>

        <OrderStatusBadge
          status={order.orderStatus}
        />

      </div>

      <Link
        to={`/orders/${order._id}`}
        className="text-amber-500 mt-4 inline-block"
      >
        View Details →
      </Link>

    </div>
  );
}

export default OrderCard;