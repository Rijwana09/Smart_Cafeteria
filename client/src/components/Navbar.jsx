import { Link } from "react-router-dom";
import { ShoppingCart} from "lucide-react"; // unc
import {useCart} from "../context/CartContext"; // unc


function Navbar() {
  const {  // uncomment
      totalItems,
  } = useCart();

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
        <Link
          to="/cart"
          className="relative"
        >
          <ShoppingCart />

          {totalItems > 0 && (
            <span
              className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              h-5
              w-5
              rounded-full
              flex
              items-center
              justify-center
              "
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;