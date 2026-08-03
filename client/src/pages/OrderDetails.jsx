import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrderById, cancelOrder } from "../services/orderService";
import OrderTimeline from "../components/orders/OrderTimeline";
import toast from "react-hot-toast";

function OrderDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [order, setOrder] =
    useState(null);

  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = () => {
    getOrderById(
      id,
      user.token
    ).then(setOrder).catch(() => {
      toast.error("Failed to load order");
      navigate("/my-orders");
    });
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = async () => {
    try {
      setCancelling(true);

      await cancelOrder(id, user.token);

      toast.success("Order cancelled");

      fetchOrder();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to cancel order"
      );
    } finally {
      setCancelling(false);
    }
  };

  if (!order)
    return <p>Loading...</p>;

  const canCancel =
    order.orderStatus === "Placed" ||
    order.orderStatus === "Preparing";

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Order Details
        </h1>

        {canCancel && (
          <button
            disabled={cancelling}
            onClick={handleCancel}
            className="
            text-red-500
            border
            border-red-500
            px-5
            py-2
            rounded-lg
            hover:bg-red-50
            "
          >
            {cancelling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}
      </div>

      <div className="mt-8">

        {order.orderItems.map(
          (item, index) => (
            <div
              key={item.food?._id || item.food || index}
              className="flex justify-between border-b py-4"
            >
              <span>
                {item.name}
              </span>

              <span>
                {item.quantity}
              </span>

              <span>
                ₹{item.price}
              </span>
            </div>
          )
        )}

        <div className="flex justify-between py-4 font-bold text-lg">
          <span>Total</span>
          <span>₹{order.totalAmount}</span>
        </div>

      </div>

      <OrderTimeline
        status={
          order.orderStatus
        }
      />

    </div>
  );
}

export default OrderDetails;
