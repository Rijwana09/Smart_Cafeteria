function OrderSummary({
  items,
  subtotal,
  tax,
  total,
}) {
  return (
    <div
      className="
      bg-white
      shadow-lg
      rounded-xl
      p-6
      h-fit
      sticky
      top-20
      "
    >
      <h2 className="text-2xl font-bold mb-5">
        Order Summary
      </h2>

      {items.map((item) => (
        <div
          key={item._id}
          className="
          flex
          justify-between
          py-2
          border-b
          "
        >
          <span>
            {item.name} ×{" "}
            {item.quantity}
          </span>

          <span>
            ₹
            {item.price *
              item.quantity}
          </span>
        </div>
      ))}

      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;