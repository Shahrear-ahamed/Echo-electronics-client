import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddItems from "./Pages/AddItems/AddItems";
import Login from "./Pages/Authontic/Login/Login";
import PasswordReset from "./Pages/Authontic/PasswordReset/PasswordReset";
import PrivetRoute from "./Pages/Authontic/PrivetRoute/PrivetRoute";
import Register from "./Pages/Authontic/Register/Register";
import Home from "./Pages/Home/Home/Home";
import Inventory from "./Pages/Inventory/Inventory";
import ManageProduct from "./Pages/ManageProduct/ManageProduct";
import Myitems from "./Pages/MyItems/Myitems";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import PageError from "./Pages/Shared/PageError/PageError";
import SingleInventoryItem from "./Pages/SingleInventoryItem/SingleInventoryItem";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/inventory"
          element={
            <PrivetRoute>
              <Inventory />
            </PrivetRoute>
          }
        />
        <Route
          path="/inventory/:id"
          element={
            <PrivetRoute>
              <SingleInventoryItem />
            </PrivetRoute>
          }
        />
        <Route
          path="/add-items"
          element={
            <PrivetRoute>
              <AddItems />
            </PrivetRoute>
          }
        />
        <Route
          path="/my-items"
          element={
            <PrivetRoute>
              <Myitems />
            </PrivetRoute>
          }
        />
        <Route
          path="/manage-inventory"
          element={
            <PrivetRoute>
              <ManageProduct />
            </PrivetRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="*" element={<PageError />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
