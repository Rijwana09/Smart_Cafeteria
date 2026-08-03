import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getFavorites, toggleFavorite } from "../services/userService";
import FoodCard from "../components/menu/FoodCard";
import toast from "react-hot-toast";

function Favorites() {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const data = await getFavorites(user.token);

      setFavorites(data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load favorites"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnfavorite = async (foodId) => {
    try {
      await toggleFavorite(foodId, user.token);

      setFavorites((prev) => prev.filter((f) => f._id !== foodId));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update favorites"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Favorites</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : favorites.length === 0 ? (
        <p className="text-gray-500">
          You haven't favorited any foods yet. Tap the heart icon on any
          menu item to save it here.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              isFavorite
              onToggleFavorite={() => handleUnfavorite(food._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
