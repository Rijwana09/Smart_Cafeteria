import OrderStatusSelect from "./OrderStatusSelect";

function OrdersTable({
  orders,
  onStatusChange,
  onView,
}) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full bg-white rounded-xl shadow">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">
              Order ID
            </th>

            <th>
              Customer
            </th>

            <th>
              Amount
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order._id}
              className="border-t"
            >

              <td className="p-4">
                #{order._id.slice(-6)}
              </td>

              <td>
                {order.customerName}
              </td>

              <td>
                ₹{order.totalAmount}
              </td>

              <td>

                <OrderStatusSelect
                  value={order.orderStatus}
                  onChange={(status) =>
                    onStatusChange(
                      order._id,
                      status
                    )
                  }
                />

              </td>

              <td>

                <button
                  onClick={() =>
                    onView(order)
                  }
                  className="
                  bg-amber-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  "
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OrdersTable;