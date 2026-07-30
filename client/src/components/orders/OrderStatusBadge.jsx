function OrderStatusBadge({
  status,
}) {

  const colors = {
    Placed:
      "bg-blue-100 text-blue-700",

    Preparing:
      "bg-yellow-100 text-yellow-700",

    Ready:
      "bg-purple-100 text-purple-700",

    Delivered:
      "bg-green-100 text-green-700",

    Cancelled:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default OrderStatusBadge;