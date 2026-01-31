import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  mods?: string[];
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (newItem) => set((state) => {
    const existing = state.items.find(i => i.id === newItem.id);
    let newItems;
    if (existing) {
        newItems = state.items.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i);
    } else {
        newItems = [...state.items, { ...newItem }];
    }
    const total = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return { items: newItems, total };
  }),
  removeItem: (id) => set((state) => {
      const newItems = state.items.filter(i => i.id !== id);
       const total = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
       return { items: newItems, total };
  }),
  updateQuantity: (id, delta) => set((state) => {
      const newItems = state.items.map(item => {
          if (item.id === id) {
              return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
      }).filter(i => i.quantity > 0);
      const total = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return { items: newItems, total };
  }),
  clearCart: () => set({ items: [], total: 0 }),
}));
