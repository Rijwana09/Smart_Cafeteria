function StatsCards() {

  const stats = [
    {
      title: "Total Orders",
      value: 24,
    },
    {
      title: "Completed",
      value: 20,
    },
    {
      title: "Pending",
      value: 4,
    },
    {
      title: "Spent",
      value: "₹4,520",
    },
  ];

  return (
    <div
      className="
      grid
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >
      {stats.map((item) => (
        <div
          key={item.title}
          className="
          bg-white
          shadow-lg
          rounded-2xl
          p-6
          "
        >
          <h3 className="text-gray-500">
            {item.title}
          </h3>

          <p
            className="
            text-3xl
            font-bold
            mt-2
            "
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;