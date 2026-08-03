import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../services/orderService";
import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    tax,
    grandTotal,
    clearCart,
  } = useCart();

  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      customerName:
        user?.name || "",

      phone: "",

      paymentMethod: "Cash",

      notes: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      cartItems.length === 0
    ) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customerName:
          formData.customerName,

        phone: formData.phone,

        paymentMethod:
          formData.paymentMethod,

        notes: formData.notes,

        orderItems: cartItems,

        totalAmount:
          grandTotal,
      };

      await createOrder(
        orderData,
        user.token
      );

      clearCart();

      navigate(
        "/order-success"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      py-10
      px-6
      "
    >
      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Checkout
      </h1>

      <div
        className="
        grid
        lg:grid-cols-3
        gap-8
        "
      >
        <CheckoutForm
          formData={formData}
          handleChange={
            handleChange
          }
          handleSubmit={
            handleSubmit
          }
          loading={loading}
        />

        <OrderSummary
          subtotal={subtotal}
          tax={tax}
          total={grandTotal}
          items={cartItems}
        />
      </div>
    </div>
  );
}

export default Checkout;