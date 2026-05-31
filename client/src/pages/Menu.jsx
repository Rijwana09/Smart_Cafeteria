import { useState } from "react";

import MenuHeader from "../components/menu/MenuHeader";
import SearchBar from "../components/menu/SearchBar";
import CategoryFilter from "../components/menu/CategoryFilter";
import FoodGrid from "../components/menu/FoodGrid";

import foodsData from "../data/foods";

function Menu() {
  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [sortBy, setSortBy] =
    useState("");

  let filteredFoods =
    foodsData.filter((food) => {

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