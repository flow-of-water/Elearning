import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (!isItemInCart) {
      setCartItems([...cartItems, item]);
    } 
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price?parseFloat(item.price):0), 0);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // const syncCartAfterLogin = async () => {
    //   const userId = localStorage.getItem('userId');
    //   if (!userId) return;

    //   try {
    //     const res = await axiosInstance.get(`/user-course/user`);
    //     const purchasedCourses = res.data.map(c => c.course_id);

    //     const updatedCart = cartItems.filter(item => !purchasedCourses.includes(item.id));
    //     if (updatedCart.length !== cartItems.length) {
    //       setCartItems(updatedCart);
    //     }
    //   } catch (error) {
    //     console.error("Failed to sync cart:", error);
    //   }
    // };

    // syncCartAfterLogin(); 
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
