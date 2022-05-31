import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  book: {},
  books: [],
  loading: false,
  error: "",
};

export const getBooks = createAsyncThunk("getBooks", async () => {
  const response = await axios.get(
    "https://book-store-api-test.herokuapp.com/books"
  );

  return response.data;
});

export const getBook = createAsyncThunk("getBook", async (id) => {
  const response = await axios.get(
    `https://book-store-api-test.herokuapp.com/books/${id}`
  );

  return response.data;
});

export const updateBook = createAsyncThunk("updateBook", async (arg) => {
  const { id, book } = arg;

  const response = await axios.put(
    `https://book-store-api-test.herokuapp.com/books/${id}`,
    book
  );

  return response.data;
});

export const addBook = createAsyncThunk("addBook", async (request) => {
  const response = await axios.post(
    "https://book-store-api-test.herokuapp.com/books",
    request
  );

  return response.data;
});

export const bookDelete = createAsyncThunk("bookDelete", async (bookID) => {
  const response = await axios.delete(
    `https://book-store-api-test.herokuapp.com/books/${bookID}`
  );

  return response.data;
});

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeBook: (state, action) => {
      state.book = {
        ...state.book,
        [action.payload.name]: action.payload.value,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getBooks.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });

    builder.addCase(getBook.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getBook.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    builder.addCase(getBook.fulfilled, (state, action) => {
      state.book = action.payload;
      state.loading = false;
    });

    builder.addCase(bookDelete.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(bookDelete.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    builder.addCase(bookDelete.fulfilled, (state, action) => {
      state.loading = false;
      state.books = state.books.filter((book) => book.id !== action.meta.arg);
    });
  },
});

export const { changeBook } = bookSlice.actions;

export default bookSlice.reducer;
