import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import bookReducer from "./features/books/bookSlice";
import cartReducer from "./features/carts/cartSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    carts: cartReducer,
  },
});

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;

export default store;
