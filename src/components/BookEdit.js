import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import {
  changeBook,
  getBook,
  updateBook,
} from "../store/features/books/bookSlice";

export default function BookEdit() {
  const navigate = useNavigate();

  const location = useLocation();

  const book = useAppSelector((state) => state.books.book);

  const dispatch = useAppDispatch();

  const onChangeText = (e) => {
    const { name, value } = e.target;

    dispatch(changeBook({ name, value }));
  };

  useEffect(() => {
    dispatch(getBook(location.state.id));
  }, [location.state.id, dispatch]);

  function editBook() {
    dispatch(updateBook({ id: location.state.id, book }));

    alert("Book successfully updated");

    navigate("/");
  }
  return (
    <div className="row">
      <div className="col-md-5">
        <input
          className="form-control"
          type="text"
          value={book.name}
          name="name"
          onChange={onChangeText}
        />
        <input
          className="form-control"
          type="text"
          value={book.author}
          name="author"
          onChange={onChangeText}
        />
        <input
          className="form-control"
          type="text"
          value={book.imgUrl}
          name="imgUrl"
          onChange={onChangeText}
        />
        <input
          className="form-control"
          type="text"
          value={book.about}
          name="about"
          onChange={onChangeText}
        />
        <input
          className="btn btn-success"
          type="submit"
          value="Update"
          onClick={() => editBook()}
        />
      </div>
    </div>
  );
}
