function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search food..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full border rounded-xl p-3"
    />
  );
}

export default SearchBar;