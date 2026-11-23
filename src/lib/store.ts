import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

export type FulfillmentType = 'pickup' | 'delivery';

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  isSearchOpen: boolean;
  fulfillmentType: FulfillmentType;
  giftNote: string;
  recipientName: string;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  setFulfillmentType: (type: FulfillmentType) => void;
  setGiftNote: (note: string) => void;
  setRecipientName: (name: string) => void;

  // Selectors
  total: () => number;
  itemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      isSearchOpen: false,
      fulfillmentType: 'delivery',
      giftNote: '',
      recipientName: '',

      addItem: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
            ),
            isDrawerOpen: true,
          });
        } else {
          set({
            items: [...get().items, { ...item, quantity }],
            isDrawerOpen: true,
          });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          });
        }
      },

      clearCart: () => set({ items: [], giftNote: '', recipientName: '' }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      setFulfillmentType: (fulfillmentType) => set({ fulfillmentType }),
      setGiftNote: (giftNote) => set({ giftNote }),
      setRecipientName: (recipientName) => set({ recipientName }),

      total: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'onelastcookie-cart',
      partialize: (state) => ({
        items: state.items,
        fulfillmentType: state.fulfillmentType,
        giftNote: state.giftNote,
        recipientName: state.recipientName,
      }),
    }
  )
);
