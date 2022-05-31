import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import Carts from "./components/Carts";
import BookEdit from "./components/BookEdit";
import BookCreate from "./components/BookCreate";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/book/create" element={<BookCreate />} />
            <Route path="/book/edit/:id" element={<BookEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
