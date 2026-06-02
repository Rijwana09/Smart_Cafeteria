function PopularFoods() {

  const foods = [
    {
      name: "Chicken Burger",
      orders: 220,
    },
    {
      name: "Veg Pizza",
      orders: 190,
    },
    {
      name: "Chicken Biryani",
      orders: 165,
    },
  ];

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

      {foods.map((food) => (
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
      ))}
    </div>
  );
}

export default PopularFoods;