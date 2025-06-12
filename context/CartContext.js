import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (e) {
        console.error("Failed to load cart:", e);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cartItems)).catch((e) =>
      console.error("Failed to save cart:", e)
    );
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getQuantity = (productId) => {
    const item = cartItems.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        updateQuantity,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product, quantity = 1) => {
//     setCartItems((prevItems) => {
//       const index = prevItems.findIndex((item) => item.id === product.id);
//       if (index >= 0) {
//         const updatedItems = [...prevItems];
//         updatedItems[index].quantity += quantity;
//         return updatedItems;
//       } else {
//         return [...prevItems, { ...product, quantity }];
//       }
//     });
//   };

//   const value = {
//     cartItems,
//     addToCart,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
