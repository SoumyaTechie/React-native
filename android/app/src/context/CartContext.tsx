// src/context/CartContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext<any>(null);

const initialState = {
  cart: [],
  subtotal: 0,
};

function cartReducer(state: any, action: any) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find((i: any) => i.id === action.payload.id);
      let updatedCart;
      if (existing) {
        updatedCart = state.cart.map((i: any) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      const subtotal = updatedCart.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );

      return { ...state, cart: updatedCart, subtotal };
    }

    case 'REMOVE_FROM_CART': {
      const updatedCart = state.cart.filter((i: any) => i.id !== action.payload);
      const subtotal = updatedCart.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
      return { ...state, cart: updatedCart, subtotal };
    }

    case 'CLEAR_CART':
      return { ...state, cart: [], subtotal: 0 };

    default:
      return state;
  }
}

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: any) =>
    dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id: string) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, clearCart, subtotal: state.subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
