import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      "
    >
      <div className="text-center">

        <h1
          className="
          text-5xl
          font-bold
          text-green-600
          "
        >
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your order.
        </p>

        <Link
          to="/dashboard"
          className="
          inline-block
          mt-8
          bg-amber-500
          text-white
          px-6
          py-3
          rounded-lg
          "
        >
          Go To Dashboard
        </Link>

      </div>
    </div>
  );
}

export default OrderSuccess;