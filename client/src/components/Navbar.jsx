import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems, clearCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    clearCart();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold text-amber-500">
          SmartCafeteria
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>

          {user ? (
            <Link
              to={user.role === "admin" ? "/admin" : "/dashboard"}
            >
              Dashboard
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/menu")}
            className="hidden sm:inline-block bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
          >
            Order Now
          </button>

          <Link to="/cart" className="relative">
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

          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold"
              >
                {user.name?.charAt(0)?.toUpperCase() || <User size={18} />}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border">
                  <p className="px-4 py-2 text-sm text-gray-500 truncate">
                    {user.name}
                  </p>

                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>

                  {user.role !== "admin" && (
                    <>
                      <Link
                        to="/my-orders"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        Settings
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
