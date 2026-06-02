import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="text-center py-20">

      <h1 className="text-4xl font-bold">
        Your Cart Is Empty
      </h1>

      <p className="text-gray-500 mt-4">
        Add some delicious food.
      </p>

      <Link
        to="/menu"
        className="
        inline-block
        mt-6
        bg-amber-500
        text-white
        px-6
        py-3
        rounded-xl
        "
      >
        Browse Menu
      </Link>

    </div>
  );
}

export default EmptyCart;