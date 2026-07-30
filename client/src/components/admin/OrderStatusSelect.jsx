function OrderStatusSelect({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
      border
      rounded
      px-3
      py-1
      "
    >
      <option>Placed</option>
      <option>Preparing</option>
      <option>Ready</option>
      <option>Delivered</option>
      <option>Cancelled</option>
    </select>
  );
}

export default OrderStatusSelect;