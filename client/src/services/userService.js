import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const updateProfile = async (profileData, token) => {
  const response = await axios.put(
    `${API_URL}/profile`,
    profileData,
    authConfig(token)
  );

  return response.data;
};

export const getFavorites = async (token) => {
  const response = await axios.get(
    `${API_URL}/favorites`,
    authConfig(token)
  );

  return response.data;
};

export const toggleFavorite = async (foodId, token) => {
  const response = await axios.post(
    `${API_URL}/favorites/${foodId}`,
    {},
    authConfig(token)
  );

  return response.data;
};
