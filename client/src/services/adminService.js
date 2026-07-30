import api from "../api/axios";

const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllOrders = async (token) => {
  const response = await api.get(
    "/admin/orders",
    getAuthConfig(token)
  );

  return response.data;
};

export const updateOrderStatus = async (
  orderId,
  status,
  token
) => {
  const response = await api.patch(
    `/admin/orders/${orderId}/status`,
    { status },
    getAuthConfig(token)
  );

  return response.data;
};

export const getDashboardStats = async (token) => {
  const response = await api.get(
    "/admin/dashboard-stats",
    getAuthConfig(token)
  );

  return response.data;
};