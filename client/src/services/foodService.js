import api from "../api/axios";

export const getAllFoods = async () => {
  const response = await api.get("/foods");
  return response.data;
};

export const getFoodById = async (id) => {
  const response = await api.get(
    `/foods/${id}`
  );

  return response.data;
};