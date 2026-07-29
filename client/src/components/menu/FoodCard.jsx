import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

function FoodCard({ food }) {
    const { addToCart } = useCart();
  return (

    

    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >

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
        src={food.image}
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