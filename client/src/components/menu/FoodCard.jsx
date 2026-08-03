import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toggleFavorite } from "../../services/userService";
import toast from "react-hot-toast";
import { useState } from "react";
import { resolveImageUrl } from "../../utils/imageUrl";

function FoodCard({ food, isFavorite: isFavoriteProp, onToggleFavorite }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(!!isFavoriteProp);
  const [busy, setBusy] = useState(false);

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to save favorites.");
      return;
    }

    if (onToggleFavorite) {
      // Parent (e.g. Favorites page) manages the state itself.
      onToggleFavorite();
      return;
    }

    try {
      setBusy(true);

      const data = await toggleFavorite(food._id, user.token);

      setIsFavorite(data.isFavorite);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update favorites"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
    >
      <button
        onClick={handleToggleFavorite}
        disabled={busy}
        aria-label="Toggle favorite"
        className="
        absolute
        top-3
        right-3
        z-10
        bg-white/90
        rounded-full
        p-2
        shadow
        "
      >
        <Heart
          size={20}
          className={isFavorite ? "text-red-500" : "text-gray-400"}
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>

      <div className="mt-2">
      {food.stock > 0 ? (
        <span
          className="
          bg-green-100
          text-green-600
          px-2
          py-1
          rounded
          text-sm
          "
        >
          In Stock
        </span>
      ) : (
        <span
          className="
          bg-red-100
          text-red-600
          px-2
          py-1
          rounded
          text-sm
          "
        >
          Out Of Stock
        </span>
      )}
    </div>
      <img
        src={resolveImageUrl(food.image)}
        alt={food.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-bold">
          {food.name}
        </h3>

        <p className="text-gray-500">
          {food.category}
        </p>

        <p className="text-amber-500 text-lg font-semibold mt-2">
          ₹{food.price}
        </p>

        <button
           onClick={() => addToCart(food)}
          className="
          mt-4
          w-full
          bg-amber-500
          text-white
          py-2
          rounded-lg
          hover:bg-amber-600
          "
        >
          Add To Cart
        </button>

      </div>
    </motion.div>
  );
}

export default FoodCard;
