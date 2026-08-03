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

export const getAllUsers = async (token) => {
  const response = await api.get(
    "/admin/users",
    getAuthConfig(token)
  );

  return response.data;
};

export const updateUserRole = async (id, role, token) => {
  const response = await api.put(
    `/admin/users/${id}/role`,
    { role },
    getAuthConfig(token)
  );

  return response.data;
};

export const deleteUser = async (id, token) => {
  const response = await api.delete(
    `/admin/users/${id}`,
    getAuthConfig(token)
  );

  return response.data;
};

export const getPopularFoods = async (token) => {
  const response = await api.get(
    "/admin/popular-foods",
    getAuthConfig(token)
  );

  return response.data;
};

export const getRevenueChart = async (token) => {
  const response = await api.get(
    "/admin/revenue-chart",
    getAuthConfig(token)
  );

  return response.data;
};

export const uploadFoodImage = async (file, token) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getAllFoodsAdmin = async (token) => {
  const response = await api.get(
    "/foods/admin/all",
    getAuthConfig(token)
  );

  return response.data;
};

export const createFood = async (foodData, token) => {
  const response = await api.post(
    "/foods",
    foodData,
    getAuthConfig(token)
  );

  return response.data;
};

export const updateFood = async (id, foodData, token) => {
  const response = await api.put(
    `/foods/${id}`,
    foodData,
    getAuthConfig(token)
  );

  return response.data;
};

export const deleteFood = async (id, token) => {
  const response = await api.delete(
    `/foods/${id}`,
    getAuthConfig(token)
  );

  return response.data;
};