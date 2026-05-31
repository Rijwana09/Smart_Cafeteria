import FoodCard from "./FoodCard";
import EmptyState from "./EmptyState";

function FoodGrid({ foods }) {
  if (foods.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className="
      grid
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-8
      "
    >
      {foods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
        />
      ))}
    </div>
  );
}

export default FoodGrid;