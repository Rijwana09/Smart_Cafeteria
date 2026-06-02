function CartSummary({
  subtotal,
  tax,
  total,
  clearCart,
}) {

  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-6
      sticky
      top-20
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>₹{tax}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

      </div>

      <button
        className="
        mt-6
        w-full
        bg-amber-500
        text-white
        py-3
        rounded-xl
        "
      >
        Checkout
      </button>

      <button
        onClick={clearCart}
        className="
        mt-3
        w-full
        bg-red-500
        text-white
        py-3
        rounded-xl
        "
      >
        Clear Cart
      </button>

    </div>
  );
}

export default CartSummary;