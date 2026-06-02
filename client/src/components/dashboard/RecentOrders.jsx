function RecentOrders() {

  const orders = [
    {
      id: "#1001",
      item: "Chicken Burger",
      status: "Delivered",
    },
    {
      id: "#1002",
      item: "Veg Pizza",
      status: "Preparing",
    },
    {
      id: "#1003",
      item: "Cold Coffee",
      status: "Delivered",
    },
  ];

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
            flex
            justify-between
            border-b
            pb-3
            "
          >
            <div>
              <h3 className="font-semibold">
                {order.item}
              </h3>

              <p className="text-gray-500">
                {order.id}
              </p>
            </div>

            <span
              className="
              text-green-600
              font-semibold
              "
            >
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;

