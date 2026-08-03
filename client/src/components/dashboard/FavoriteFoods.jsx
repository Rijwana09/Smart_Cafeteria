import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getFavorites } from "../../services/userService";

function FavoriteFoods() {
  const { user } = useAuth();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites(user.token);

        setFoods(data);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user.token]);

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Favorite Foods
        </h2>

        <Link to="/favorites" className="text-amber-500 text-sm">
          View all →
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-gray-500">
          No favorites yet — tap the heart on any menu item.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {foods.slice(0, 6).map((food) => (
            <span
              key={food._id}
              className="
              bg-amber-100
              text-amber-600
              px-4
              py-2
              rounded-full
              "
            >
              {food.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteFoods;
