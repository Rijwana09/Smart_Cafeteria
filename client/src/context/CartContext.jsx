import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({
  children,
}) => {

  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {

    const storedCart =
      localStorage.getItem("cartItems");

    return storedCart ? JSON.parse(storedCart): [];

  });

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  // Add Item
  const addToCart = (food) => {

    const existingItem =
      cartItems.find(
        (item) =>
          item._id === food._id
      );

    if (existingItem) {

      setCartItems(
        cartItems.map((item) =>
          item._id === food._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...food,
          quantity: 1,
        },
      ]);

      // setCartItems((prevItems) => [
      //   ...prevItems,
      //   newItem,
      // ]);

    }
  };

  // Increase Quantity
  const increaseQuantity = (
    foodId
  ) => {

    // setCartItems(
    //   cartItems.map((item) =>
    //     item._id === foodId
    //       ? {
    //           ...item,
    //           quantity:
    //             item.quantity + 1,
    //         }
    //       : item
    //   )
    // ); 

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === foodId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  
  


  // Decrease Quantity
  const decreaseQuantity = (
    foodId
  ) => {

    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === foodId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );


    // setCartItems(
    //   cartItems
    //     .map((item) =>
    //       item._id === foodId
    //         ? {
    //             ...item,
    //             quantity:
    //               item.quantity - 1,
    //           }
    //         : item
    //     )
    //     .filter(
    //       (item) =>
    //         item.quantity > 0
    //     )
    // );
  };

  


  // Remove Item
  const removeItem = (
    foodId
  ) => {


    setCartItems((prevItems) =>
    prevItems.filter(
      (item) =>
        item._id !== foodId
    )
  );
    // setCartItems(
    //   cartItems.filter(
    //     (item) =>
    //       item._id !== foodId
    //   )
    // );

  };

  

  // Clear Cart
  const clearCart = () => {

    setCartItems([]);

  };

  // Total Quantity
  const totalItems =
    useMemo(() => {

      return cartItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

    }, [cartItems]);

  // Subtotal
  const subtotal =
    useMemo(() => {

      return cartItems.reduce(
        (total, item) =>
          total +
          item.price *
            item.quantity,
        0
      );

    }, [cartItems]);

  //Tax and Grand
  const tax = useMemo(() => {

    return Math.round(
      subtotal * 0.05
    );

  }, [subtotal]);

  const grandTotal = useMemo(() => {

    return subtotal + tax;

    }, [subtotal, tax]);


  const value = {

    cartItems,

    addToCart,

    increaseQuantity,

    decreaseQuantity,

    removeItem,

    clearCart,

    totalItems,

    subtotal,

    tax,

    grandTotal
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);