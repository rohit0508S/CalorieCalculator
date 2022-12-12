import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import Today from "./pages/Today";
import View from "./pages/View";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addContact" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/today" element={<Today />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
