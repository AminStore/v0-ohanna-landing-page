import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; product: Product; size?: string }
  | { type: "REMOVE"; productId: string; size?: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number; size?: string }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "HYDRATE"; items: CartItem[] };

function itemKey(productId: string, size?: string) {
  return `${productId}__${size ?? "default"}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const key = itemKey(action.product.id, action.size);
      const existing = state.items.find(
        (i) => itemKey(i.product.id, i.size) === key,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            itemKey(i.product.id, i.size) === key
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: 1, size: action.size },
        ],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (i) => itemKey(i.product.id, i.size) !== itemKey(action.productId, action.size),
        ),
      };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => itemKey(i.product.id, i.size) !== itemKey(action.productId, action.size),
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          itemKey(i.product.id, i.size) === itemKey(action.productId, action.size)
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  total: number;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ohanna-cart");
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        dispatch({ type: "HYDRATE", items });
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("ohanna-cart", JSON.stringify(state.items));
    } catch {}
  }, [state.items, hydrated]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    itemCount,
    total,
    addToCart: (product, size) => dispatch({ type: "ADD", product, size }),
    removeFromCart: (productId, size) => dispatch({ type: "REMOVE", productId, size }),
    updateQuantity: (productId, quantity, size) =>
      dispatch({ type: "UPDATE_QTY", productId, quantity, size }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    openCart: () => dispatch({ type: "OPEN" }),
    closeCart: () => dispatch({ type: "CLOSE" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
