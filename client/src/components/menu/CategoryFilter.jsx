function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const list = ["All", ...(categories || [])];

  return (
    <div className="flex flex-wrap gap-3">

      {list.map((category) => (
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
