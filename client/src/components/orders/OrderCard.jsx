import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

function OrderCard({ order, onCancel }) {

  const canCancel =
    order.orderStatus === "Placed" ||
    order.orderStatus === "Preparing";

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

      <div className="flex items-center justify-between mt-4">
        <Link
          to={`/orders/${order._id}`}
          className="text-amber-500 inline-block"
        >
          View Details →
        </Link>

        {canCancel && onCancel && (
          <button
            onClick={() => onCancel(order._id)}
            className="
            text-red-500
            border
            border-red-500
            px-4
            py-1.5
            rounded-lg
            hover:bg-red-50
            "
          >
            Cancel Order
          </button>
        )}
      </div>

    </div>
  );
}

export default OrderCard;
