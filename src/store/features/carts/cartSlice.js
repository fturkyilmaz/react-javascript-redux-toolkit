import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  carts: [],
};

export const getCarts = createAsyncThunk("getCarts", async () => {
  const response = await axios.get(
    "https://book-store-api-test.herokuapp.com/carts"
  );

  return response.data;
});

export const cartDelete = createAsyncThunk("cartDelete", async (id) => {
  const response = await axios.delete(
    `https://book-store-api-test.herokuapp.com/carts/${id}`
  );

  return response.data;
});

export const cartAdd = createAsyncThunk("cartDelete", async (item) => {
  const response = await axios.post(
    "https://book-store-api-test.herokuapp.com/carts",
    item
  );

  return response.data;
});

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCarts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCarts.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    builder.addCase(getCarts.fulfilled, (state, action) => {
      state.carts = action.payload;
      state.loading = false;
    });

    builder.addCase(cartDelete.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(cartDelete.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    builder.addCase(cartDelete.fulfilled, (state, action) => {
      state.carts = state.carts.filter((cart) => cart.id !== action.meta.arg);
      state.loading = false;
      state.error = "";
    });
  },
});

export default cartSlice.reducer;
