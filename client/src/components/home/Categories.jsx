const categories = [
  "Pizza",
  "Burger",
  "Biryani",
  "Cold Drinks",
  "Snacks",
  "Desserts",
];

function Categories() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Categories
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">

          {categories.map((item) => (
            <div
              key={item}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;