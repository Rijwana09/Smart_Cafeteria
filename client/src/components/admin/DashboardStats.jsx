function DashboardStats() {

  const stats = [
    {
      title: "Total Orders",
      value: "1,245",
    },
    {
      title: "Revenue",
      value: "₹1,85,000",
    },
    {
      title: "Users",
      value: "532",
    },
    {
      title: "Foods",
      value: "84",
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
          p-6
          rounded-2xl
          shadow-lg
          "
        >
          <p className="text-gray-500">
            {item.title}
          </p>

          <h2
            className="
            text-3xl
            font-bold
            mt-2
            "
          >
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;