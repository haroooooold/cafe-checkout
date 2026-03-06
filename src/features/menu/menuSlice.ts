import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "./menuAPI";
import { removeDuplicates } from "../../utils/removeDuplicates";
import type { Product } from "./types";

interface MenuState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MenuState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  const products = await fetchProducts();
  return removeDuplicates(products);
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.products = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch menu";
      });
  },
});

export default menuSlice.reducer;
