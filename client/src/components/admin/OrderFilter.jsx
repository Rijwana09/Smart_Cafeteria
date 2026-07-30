function OrderFilter({
  status,
  setStatus,
}) {
  return (
    <select
      value={status}
      onChange={(e) =>
        setStatus(e.target.value)
      }
      className="
      border
      rounded-lg
      px-4
      py-2
      "
    >
      <option value="All">
        All Status
      </option>

      <option value="Placed">
        Placed
      </option>

      <option value="Preparing">
        Preparing
      </option>

      <option value="Ready">
        Ready
      </option>

      <option value="Delivered">
        Delivered
      </option>

      <option value="Cancelled">
        Cancelled
      </option>
    </select>
  );
}

export default OrderFilter;