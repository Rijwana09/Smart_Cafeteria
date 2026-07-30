function OrderSearch({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Search by customer or order ID..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="
      w-full
      md:w-80
      border
      rounded-lg
      px-4
      py-2
      "
    />
  );
}

export default OrderSearch;