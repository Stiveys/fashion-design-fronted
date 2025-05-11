import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem } from '../types';

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'TOGGLE_CART'; payload?: boolean };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => 
          item.id === action.payload.id && 
          item.selectedSize === action.payload.selectedSize && 
          item.selectedColor === action.payload.selectedColor
      );

      let updatedItems: CartItem[];

      if (existingItemIndex > -1) {
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }

      const { totalItems, totalPrice } = calculateTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
        isOpen: true,
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const { totalItems, totalPrice } = calculateTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
      const { totalItems, totalPrice } = calculateTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: action.payload !== undefined ? action.payload : !state.isOpen,
      };
    }

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleCart: (open?: boolean) => void;
} | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart) as CartItem[];
      parsedCart.forEach(item => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const toggleCart = (open?: boolean) => {
    dispatch({ type: 'TOGGLE_CART', payload: open });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};