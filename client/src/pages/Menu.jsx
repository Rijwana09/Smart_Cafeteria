import { useEffect, useMemo, useState } from "react";

import MenuHeader from "../components/menu/MenuHeader";
import SearchBar from "../components/menu/SearchBar";
import CategoryFilter from "../components/menu/CategoryFilter";
import FoodGrid from "../components/menu/FoodGrid";

import { getAllFoods } from "../services/foodService";

import Loading from "../components/common/Loading";

import Error from "../components/common/Error";

const PAGE_SIZE = 9;

function Menu() {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortBy, setSortBy] = useState("");

  const [page, setPage] = useState(1);

  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);

        const data = await getAllFoods();

        setFoods(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch foods"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Reset back to page 1 whenever the filters change, so a user isn't
  // stranded on a now-empty page 3 after narrowing the results.
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    const unique = new Set(foods.map((f) => f.category).filter(Boolean));

    return Array.from(unique).sort();
  }, [foods]);

  let filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ? true : food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortBy === "low") {
    filteredFoods = [...filteredFoods].sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high") {
    filteredFoods = [...filteredFoods].sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFoods.length / PAGE_SIZE)
  );

  const paginatedFoods = filteredFoods.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Error message={error} />
      </div>
    );
  }

  return (
    <div>

      <MenuHeader />

      <section className="py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-3 gap-4 mb-8">

            <SearchBar search={search} setSearch={setSearch} />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
              border
              p-3
              rounded-xl
              "
            >
              <option value="">Sort</option>

              <option value="low">Price Low to High</option>

              <option value="high">Price High to Low</option>

            </select>

          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="mt-10">

            <FoodGrid foods={paginatedFoods} />

          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-lg border ${
                      p === page ? "bg-amber-500 text-white" : ""
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default Menu;
