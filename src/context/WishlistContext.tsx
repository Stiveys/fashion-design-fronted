import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types';

type WishlistState = {
  items: Product[];
  totalItems: number;
};

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number };

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return state;
      }
      
      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + 1,
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
      };
    }

    default:
      return state;
  }
};

const WishlistContext = createContext<{
  state: WishlistState;
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
} | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const parsedWishlist = JSON.parse(savedWishlist) as Product[];
      parsedWishlist.forEach(item => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (item: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const isInWishlist = (id: number) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ state, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};