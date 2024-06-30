import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
  items: (Product & { quantity: number })[];
  addItem: (data: Product) => void;
  decrementQuantity: (id: String) => void;
  removeItem: (id: String) => void;
  removeAllItems: () => void;
  isInCart: (id: String) => boolean;
  getQuantity: (id: String) => number;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        set((state) => {
          const item = state.items.find((item) => item.id === data.id);
          if (item) {
            item.quantity++;
            return { items: [...state.items] };
          }
          toast.success("Product added to cart");
          return { items: [...state.items, { ...data, quantity: 1 }] };
        });
      },
      decrementQuantity: (id) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id);
          if (item) {
            if (item.quantity > 1) {
              item.quantity--;
              return { items: [...state.items] };
            }
            toast.success("Product removed from cart");
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return { items: [...state.items] };
        });
      },
      removeItem: (id) => {
        set((state) => {
          return { items: state.items.filter((item) => item.id !== id) };
        });
        toast.success("Product removed from cart");
      },
      removeAllItems: () => {
        set({ items: [] });
      },
      isInCart: (id) => {
        return get().items.some((item) => item.id === id);
      },
      getQuantity: (id) => {
        const item = get().items.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
