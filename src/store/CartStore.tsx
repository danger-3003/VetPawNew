// store/CartStore.ts
"use client";

import { CartState } from "@/components/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartCount: 0,

      initialCart: (count: number) => {
        set({ cartCount: count });
      },

      addToCart: (quantity: number = 1) => {
        set({ cartCount: get().cartCount + quantity });
      },

      removeFromCart: (quantity: number = 1) => {
        const current = get().cartCount;
        set({ cartCount: Math.max(current - quantity, 0) });
      },

      setCart: (count: number) => {
        set({ cartCount: Math.max(count, 0) });
      },

      clearCart: () => set({ cartCount: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);
