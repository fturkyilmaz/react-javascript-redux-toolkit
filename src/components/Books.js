import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { bookDelete, getBooks } from "../store/features/books/bookSlice";
import { cartAdd } from "../store/features/carts/cartSlice";

export default function Books() {
  const state = useAppSelector((state) => state.books);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function deleteBook(id) {
    const confirmDelete = window.confirm("Delete item forever?");

    if (confirmDelete) {
      dispatch(bookDelete(id));
    }
  }

  function addToCart(item) {
    dispatch(cartAdd(item));
  }

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const renderList = state.books.map((b) => {
    return (
      <tr key={b.id}>
        <td>{b.id}</td>
        <td>
          <img
            src={b.imgUrl}
            style={{ height: "350", width: 150 }}
            alt="Book cover"
          />
        </td>
        <td>{b.name}</td>
        <td>{b.author}</td>
        <td>{b.about}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() =>
              navigate("/book/edit/" + b.id, {
                state: { id: b.id },
              })
            }>
            {" "}
            Edit Book{" "}
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteBook(b.id);
            }}>
            Delete Book
          </button>
        </td>

        <td>
          <button
            className="btn btn-success"
            onClick={() => {
              addToCart(b);
            }}>
            Add Cart
          </button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/book/create")}>
        New Book
      </button>
      <table className="table table-hoover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>About</th>
          </tr>
        </thead>
        <tbody>{renderList}</tbody>
      </table>
    </>
  );
}
