function FavoriteFoods() {

  const foods = [
    "Chicken Burger",
    "Veg Pizza",
    "Chicken Biryani",
  ];

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Favorite Foods
      </h2>

      <div className="flex flex-wrap gap-3">
        {foods.map((food) => (
          <span
            key={food}
            className="
            bg-amber-100
            text-amber-600
            px-4
            py-2
            rounded-full
            "
          >
            {food}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FavoriteFoods;