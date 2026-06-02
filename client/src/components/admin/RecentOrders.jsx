function RecentOrders() {

  const orders = [
    {
      id: "#1001",
      customer: "Rijwana",
      amount: "₹220",
      status: "Delivered",
    },
    {
      id: "#1002",
      customer: "Rahul",
      amount: "₹350",
      status: "Preparing",
    },
    {
      id: "#1003",
      customer: "Amit",
      amount: "₹180",
      status: "Pending",
    },
  ];

  return (
    <div
      className="
      bg-white
      p-6
      rounded-2xl
      shadow-lg
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
        "
      >
        Recent Orders
      </h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t"
            >
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;