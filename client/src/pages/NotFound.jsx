import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      text-center
      px-6
      "
    >
      <h1 className="text-7xl font-bold text-amber-500">404</h1>

      <p className="mt-4 text-2xl font-semibold">Page Not Found</p>

      <p className="mt-2 text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="
        inline-block
        mt-8
        bg-amber-500
        text-white
        px-6
        py-3
        rounded-xl
        "
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
