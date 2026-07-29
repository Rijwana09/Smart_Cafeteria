function CheckoutForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="
      lg:col-span-2
      bg-white
      shadow-lg
      rounded-xl
      p-6
      space-y-5
      "
    >
      <h2 className="text-2xl font-bold">
        Customer Details
      </h2>

      <input
        type="text"
        name="customerName"
        placeholder="Full Name"
        value={
          formData.customerName
        }
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <select
        name="paymentMethod"
        value={
          formData.paymentMethod
        }
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Cash">
          Cash
        </option>

        <option value="UPI">
          UPI
        </option>

        <option value="Card">
          Card
        </option>
      </select>

      <textarea
        name="notes"
        rows="4"
        placeholder="Special Instructions"
        value={formData.notes}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <button
        disabled={loading}
        className="
        w-full
        bg-amber-500
        text-white
        py-3
        rounded-lg
        "
      >
        {loading
          ? "Placing Order..."
          : "Place Order"}
      </button>
    </form>
  );
}

export default CheckoutForm;