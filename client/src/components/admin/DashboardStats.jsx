import Skeleton from "react-loading-skeleton";
// import { CSVLink }
// from "react-csv";
import StatCard from "./StatCard";
import { useState } from "react";

function DashboardStats() {

  const stats = [
    {
      id: 1,
      title: "Total Orders",
      value: 1245
    },
    {
      id: 2,
      title: "Revenue",
      value: 185000
    },
    {
      id: 3,
      title: "Users",
      value: 532
    },
    {
      id: 4,
      title: "Foods",
      value: 84
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;

  const indexOfLast = currentPage * ordersPerPage;

  const indexOfFirst = indexOfLast - ordersPerPage;

  // const currentOrders =
  //   filteredOrders.slice(
  //   indexOfFirst,
  //   indexOfLast
  //   );

  return (
    <div
      className="
      grid
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >

      {/* <div className="grid md:grid-cols-4 gap-6 mb-8">

           {/* {stats.map(stat => 
             <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
            />
           )} 

        </div> */}

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