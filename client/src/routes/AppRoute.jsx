import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboaard";
import AdminDashboard from "../pages/AdminDashboard";
import Checkout from "../pages/checkout";
import OrderSuccess from "../pages/OrderSuccess";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/test-admin" element={<AdminDashboard />}/> {/* ye abhi test karne ke liye yeh per add kiye h */}
      <Route path="/checkout" element={<Checkout />}/>
      <Route path="/order-success" element={<OrderSuccess />}/>
    </Routes>
  );
}

export default AppRoutes;

