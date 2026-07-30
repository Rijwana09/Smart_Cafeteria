import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  CartProvider,
} from "./context/CartContext";

import {
  AuthProvider,
} from "./context/AuthContext";


import { Toaster } from "react-hot-toast";

//yaha se samjh nhi
// import toast from "react-hot-toast";

// toast.success("Order status updated");

// toast.error("Failed to update order");
//jab eeror ya message print karna hoga tab ye use karna h. hmm lakin import paste kis page main krna h yahi samjh ke bahar h yahi pr kr diye alert bol ke kuch nhi dikh rha h 

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
  <AuthProvider>
    <CartProvider>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);














// import React from "react";
// import ReactDOM from "react-dom/client";

// import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";

// import App from "./App.jsx";

// ReactDOM.createRoot(
//   document.getElementById("root")
// ).render(
//   <BrowserRouter>
//   <AuthProvider>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </AuthProvider>
//   </BrowserRouter>
// );


