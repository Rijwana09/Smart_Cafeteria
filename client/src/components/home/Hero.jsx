import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-orange-100 py-24">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold leading-tight">
            Fresh Food For Your Campus
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Order delicious meals online and skip the queue.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-amber-500 text-white px-6 py-3 rounded-xl">
              Order Now
            </button>

            <button className="border px-6 py-3 rounded-xl">
              View Menu
            </button>
          </div>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
          alt="Food"
          className="rounded-3xl shadow-xl"
        />
      </div>
    </section>
  );
}

export default Hero;