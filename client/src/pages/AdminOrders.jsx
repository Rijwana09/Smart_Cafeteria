import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "../context/AuthContext";

import {
  getAllOrders,
  updateOrderStatus,
} from "../services/adminService";

import OrdersTable from "../components/admin/OrdersTable";
import OrderSearch from "../components/admin/OrderSearch";
import OrderFilter from "../components/admin/OrderFilter";
import OrderDetailsModal from "../components/admin/OrderDetailsModal";

function AdminOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data =
      await getAllOrders(
        user.token
      );

    setOrders(data);
  };

  const handleStatusChange =
    async (
      orderId,
      newStatus
    ) => {

      await updateOrderStatus(
        orderId,
        newStatus,
        user.token
      );

      fetchOrders();
    };

  const filteredOrders =
    useMemo(() => {

      return orders.filter(
        (order) => {

          const matchesSearch =
            order.customerName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            order._id
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =
            status === "All"
              ? true
              : order.orderStatus ===
                status;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [
      orders,
      search,
      status,
    ]);

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Manage Orders
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">

        <OrderSearch
          search={search}
          setSearch={setSearch}
        />

        <OrderFilter
          status={status}
          setStatus={setStatus}
        />

      </div>

      <OrdersTable
        orders={filteredOrders}
        onStatusChange={
          handleStatusChange
        }
        onView={
          setSelectedOrder
        }
      />

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() =>
          setSelectedOrder(null)
        }
      />

    </div>
  );
}

export default AdminOrders;