import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

import { useCart } from "../context/CartContext";

function Cart() {

  const { cartItems,
    clearCart, grandTotal
  } = useCart();

  const subtotal =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price * item.quantity,
      0
    );

  const tax =
    Math.round(subtotal * 0.05);

  const total =
    subtotal + tax;

  // const {subtotal, tax, grandTotal } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-6
      py-10
      "
    >
      <h1
        className="
        text-4xl
        font-bold
        mb-10
        "
      >
        Shopping Cart
      </h1>

      <div
        className="
        grid
        lg:grid-cols-3
        gap-8
        "
      >
        <div
          className="
          lg:col-span-2
          space-y-6
          "
        >
          {cartItems.map((item) => (
            <CartItem
              key={item._id}  // add unders
              item={item}
            />
          ))}
        </div>

        <CartSummary 
          subtotal={subtotal}
          tax={tax}
          total={grandTotal}
          clearCart={clearCart}
        />

      </div>
    </div>
  );
}

export default Cart;