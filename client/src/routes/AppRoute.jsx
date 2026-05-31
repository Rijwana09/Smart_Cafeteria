import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
// import Menu from "../pages/Menu";
// import Cart from "../pages/Cart";
// import Login from "../pages/Login";
// import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}

export default AppRoutes;