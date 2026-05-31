import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-amber-500">
          SmartCafeteria
        </h1>

        <div className="hidden md:flex gap-8">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>

        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg">
          Order Now
        </button>
      </div>
    </nav>
  );
}

export default Navbar;