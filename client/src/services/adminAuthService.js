import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/auth";

export const adminLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  // Normalize the response shape to match the regular user login shape
  // ({ _id, name, email, role, token }) so the rest of the app (AuthContext,
  // AdminOrders, etc.) can treat admins and customers uniformly.
  const { token, admin } = response.data;

  return {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token,
  };
};
