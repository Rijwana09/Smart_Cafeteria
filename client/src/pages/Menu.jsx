import { useEffect, useState } from "react";

import MenuHeader from "../components/menu/MenuHeader";
import SearchBar from "../components/menu/SearchBar";
import CategoryFilter from "../components/menu/CategoryFilter";
import FoodGrid from "../components/menu/FoodGrid";

import { getAllFoods } from "../services/foodService";

import Loading from "../components/common/Loading";

import Error from "../components/common/Error";

function Menu() {
  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [sortBy, setSortBy] =
    useState("");


  const [foods, setFoods] =
  useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

  const fetchFoods =
    async () => {

      try {

        setLoading(true);

        const data =
          await getAllFoods();

        setFoods(data);

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
            "Failed to fetch foods"
        );

      } finally {

        setLoading(false);

      }
    };

  fetchFoods();

}, []);


  let filteredFoods =
  foods.filter((food) => {

  const matchesSearch =
    food.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const matchesCategory =
    selectedCategory === "All"
      ? true
      : food.category ===
        selectedCategory;

  return (
    matchesSearch &&
    matchesCategory
  );
});

  if (sortBy === "low") {
    filteredFoods.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high") {
    filteredFoods.sort(
      (a, b) => b.price - a.price
    );
  }

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

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="
              border
              p-3
              rounded-xl
              "
            >
              <option value="">
                Sort
              </option>

              <option value="low">
                Price Low to High
              </option>

              <option value="high">
                Price High to Low
              </option>

            </select>

          </div>

          <CategoryFilter
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }
          />

          <div className="mt-10">

            <FoodGrid
              foods={filteredFoods}
            />

          </div>

        </div>

      </section>

    </div>
  );
}

export default Menu;