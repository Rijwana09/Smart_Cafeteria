import { motion } from "framer-motion";

function FoodCard({ food }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
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