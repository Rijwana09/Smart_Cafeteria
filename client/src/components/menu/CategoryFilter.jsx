const categories = [
  "All",
  "Burger",
  "Pizza",
  "Biryani",
  "Drinks",
  "Snacks",
  "Dessert",
];

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === category
              ? "bg-amber-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;