import { CartProductType } from '@/app/product/[productId]/ProductDetail';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
  product: Product;
};

type CartState = {
  cartTotalQty: number;
  items: CartProductType[];
  addItem: (product: CartProductType) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cartTotalQty: 0,
      items: [],
      addItem: (product: CartProductType) =>
        set((state) => {
          return { items: [...state.items, product] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
