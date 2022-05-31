import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { getCarts, cartDelete } from "../store/features/carts/cartSlice";

export default function Carts() {
  const state = useAppSelector((state) => state.carts);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function deleteCart(id) {
    const confirmDelete = window.confirm("Delete item forever?");

    if (confirmDelete) {
      dispatch(cartDelete(id));
    }
  }

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  const renderList = state.carts.map((b) => {
    return (
      <tr key={b.id}>
        <td>{b.id}</td>
        <td>
          <img
            src={b.imgUrl}
            style={{ height: "350", width: 150 }}
            alt="Books cover"
          />
        </td>
        <td>{b.name}</td>
        <td>{b.author}</td>
        <td>{b.about}</td>

        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteCart(b.id);
            }}>
            Delete Cart
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <button className="btn btn-primary" onClick={() => navigate("/books")}>
        Go To Book
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
