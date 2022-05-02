import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Pages/Shared/Header/Header";
import Home from "./Pages/Home/Home/Home";
import Footer from "./Pages/Shared/Footer/Footer";
import Register from "./Pages/Authontic/Register/Register";
import Login from "./Pages/Authontic/Login/Login";
import PageError from "./Pages/Shared/PageError/PageError";
import PrivetRoute from "./Pages/Authontic/PrivetRoute/PrivetRoute";
import Inventory from "./Pages/Inventory/Inventory";
import "react-toastify/dist/ReactToastify.css";
import PasswordReset from "./Pages/Authontic/PasswordReset/PasswordReset";
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
