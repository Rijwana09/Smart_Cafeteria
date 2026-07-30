import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrderById } from "../services/orderService";
import OrderTimeline from "../components/orders/OrderTimeline";

function OrderDetails() {

  const { id } = useParams();

  const { user } = useAuth();

  const [order, setOrder] =
    useState(null);

  useEffect(() => {

    getOrderById(
      id,
      user.token
    ).then(setOrder);

  }, []);

  if (!order)
    return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10">

      <h1 className="text-4xl font-bold">
        Order Details
      </h1>

      <div className="mt-8">

        {order.orderItems.map(
          (item) => (
            <div
              key={item.food}
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