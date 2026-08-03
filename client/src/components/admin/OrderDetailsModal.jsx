function OrderDetailsModal({
  order,
  onClose,
}) {
  if (!order) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      "
    >
      <div
        className="
        bg-white
        rounded-xl
        p-6
        w-full
        max-w-2xl
        "
      >
        <h2 className="text-2xl font-bold mb-4">
          Order Details
        </h2>

        <p>
          Customer:
          {" "}
          {order.customerName}
        </p>

        <p>
          Phone:
          {" "}
          {order.phone}
        </p>

        <p>
          Payment:
          {" "}
          {order.paymentMethod}
        </p>

        <hr className="my-4" />

        {order.orderItems.map(
          (item, index) => (
            <div
              key={item.food?._id || item.food || index}
              className="flex justify-between py-2"
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

        <button
          onClick={onClose}
          className="
          mt-6
          bg-red-500
          text-white
          px-5
          py-2
          rounded-lg
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderDetailsModal;