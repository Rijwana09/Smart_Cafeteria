import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getPopularFoods } from "../../services/adminService";

function PopularFoods() {
  const { user } = useAuth();

  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getPopularFoods(user.token);

        setFoods(data);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to load popular foods"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [user.token]);

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
        Popular Foods
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        foods.map((food) => (
          <div
            key={food.name}
            className="
            flex
            justify-between
            py-3
            border-b
            "
          >
            <span>{food.name}</span>
            <span>{food.orders}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default PopularFoods;
