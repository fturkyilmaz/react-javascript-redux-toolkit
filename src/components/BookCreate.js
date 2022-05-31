import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { addBook } from "../store/features/books/bookSlice";

export default function BookCreate() {
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    imgUrl: "",
    about: "",
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onChangeText = (e) => {
    const { name, value } = e.target;

    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function createBook() {
    dispatch(addBook(newBook));

    alert("Book created successfully");

    navigate("/");
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <input
          className="form-control"
          type="text"
          value={newBook.name}
          name="name"
          onChange={onChangeText}
        />
        <input
          className="form-control"
          type="text"
          value={newBook.author}
          name="author"
          onChange={onChangeText}
        />
        <input
          className="btn btn-success"
          type="submit"
          value="Create"
          onClick={() => createBook()}
        />
      </div>
    </div>
  );
}
