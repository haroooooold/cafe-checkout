import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Size = "Small" | "Medium" | "Large";

interface CartItem {
  id: number;
  name: string;
  price: number;
  size?: Size;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;

      const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push(item);
      }
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; size?: Size; quantity: number }>,
    ) {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id && i.size === size);

      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity === 0) {
        state.items = state.items.filter((i) => i !== item);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
