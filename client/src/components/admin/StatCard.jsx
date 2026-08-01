// import { motion } from "framer-motion";

// function StatCard({ title, value }) {
//   return (
//     <motion.div
//       whileHover={{
//         y: -5,
//         scale: 1.02,
//       }}
//       transition={{ duration: 0.2 }}
//       className="
//         bg-white
//         dark:bg-gray-900
//         rounded-2xl
//         shadow-md
//         hover:shadow-xl
//         p-6
//         border
//         border-gray-100
//         dark:border-gray-800
//       "
//     >
//       <p className="text-sm text-gray-500 dark:text-gray-400">
//         {title}
//       </p>

//       <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
//         {value}
//       </h2>
//     </motion.div>
//   );
// }

// export default StatCard;

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;