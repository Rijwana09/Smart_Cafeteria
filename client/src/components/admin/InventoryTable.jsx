import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { resolveImageUrl } from "../../utils/imageUrl";
import {
  getAllFoodsAdmin,
  updateFood,
  deleteFood,
} from "../../services/adminService";

function InventoryTable() {
  const { user } = useAuth();

  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const data = await getAllFoodsAdmin(user.token);

      setFoods(data);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStockChange = async (food, delta) => {
    const newStock = Math.max(0, food.stock + delta);

    try {
      await updateFood(food._id, { stock: newStock }, user.token);

      setFoods((prev) =>
        prev.map((f) =>
          f._id === food._id ? { ...f, stock: newStock } : f
        )
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update stock"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this food item?")) return;

    try {
      await deleteFood(id, user.token);

      toast.success("Food removed");

      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to delete food"
      );
    }
  };

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
        Inventory
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-gray-500">No food items yet.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th className="text-left">Stock</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food) => (
              <tr
                key={food._id}
                className="border-t"
              >
                <td>
                  <div className="flex items-center gap-3 py-1">
                    <img
                      src={resolveImageUrl(food.image)}
                      alt={food.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    {food.name}
                  </div>
                </td>
                <td>{food.stock}</td>
                <td>
                  <div className="flex items-center gap-2 py-1">
                    <button
                      onClick={() => handleStockChange(food, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <button
                      onClick={() => handleStockChange(food, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleDelete(food._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InventoryTable;
