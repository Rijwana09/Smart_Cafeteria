import { motion } from "framer-motion";

const foods = [
  {
    name: "Chicken Burger",
    price: "₹120",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    name: "Veg Pizza",
    price: "₹220",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    name: "Chicken Biryani",
    price: "₹180",
    image:
      "https://images.unsplash.com/photo-1701579231349-f6f53b51a3f5",
  },
];

function FeaturedFoods() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Popular Foods
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {foods.map((food) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={food.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-60 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold">
                  {food.name}
                </h3>

                <p className="text-amber-500 mt-2">
                  {food.price}
                </p>

                <button className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg">
                  Add To Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedFoods;