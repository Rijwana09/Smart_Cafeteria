import Skeleton from
"react-loading-skeleton";
// import { CSVLink }
// from "react-csv";

import { useState } from "react";

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

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;

  const indexOfLast = currentPage * ordersPerPage;

  const indexOfFirst = indexOfLast - ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
    indexOfFirst,
    indexOfLast
    );

  return (
    <div
      className="
      grid
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >

      <div className="grid md:grid-cols-4 gap-6 mb-8">

            <StatCard
                title="Orders"
                value={stats.totalOrders}
            />

            <StatCard
                title="Revenue"
                value={`₹${stats.totalRevenue}`}
            />

            <StatCard
                title="Users"
                value={stats.totalUsers}
            />

            <StatCard
                title="Foods"
                value={stats.totalFoods}
            />

        </div>

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


      <Skeleton height={60} count={8}/>

      <select>

<option>Today</option>

<option>Last 7 Days</option>

<option>This Month</option>

</select>

{/* <CSVLink
data={filteredOrders}
filename="orders.csv"
>

Export Orders

</CSVLink> */}
    </div>

    
  );
}

export default DashboardStats;