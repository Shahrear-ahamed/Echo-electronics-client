import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddItems from "./Pages/AddItems/AddItems";
import Login from "./Pages/Authontic/Login/Login";
import PasswordReset from "./Pages/Authontic/PasswordReset/PasswordReset";
import PrivetRoute from "./Pages/Authontic/PrivetRoute/PrivetRoute";
import ProtectRoute from "./Pages/Authontic/PrivetRoute/ProtectRoute";
import Register from "./Pages/Authontic/Register/Register";
import Blog from "./Pages/Blog/Blog";
import Home from "./Pages/Home/Home/Home";
import ManageProduct from "./Pages/ManageProduct/ManageProduct";
import Myitems from "./Pages/MyItems/Myitems";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import PageError from "./Pages/Shared/PageError/PageError";
import SingleInventoryItem from "./Pages/SingleInventoryItem/SingleInventoryItem";
import { useEffect, useState } from "react";
import { decodedAuthToken } from "./utils/token";

function App() {
  const [user, setUser] = useState({
    loading: true,
  });

  useEffect(() => {
    const user = decodedAuthToken();

    setUser({ ...user, loading: false });
  }, []);
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
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
              <AddItems user={user} />
            </PrivetRoute>
          }
        />
        <Route
          path="/my-items"
          element={
            <PrivetRoute>
              <Myitems user={user} />
            </PrivetRoute>
          }
        />
        <Route
          path="/manage-inventory"
          element={
            <PrivetRoute>
              <ManageProduct user={user} />
            </PrivetRoute>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/login"
          element={
            <ProtectRoute>
              <Login setUser={setUser} />
            </ProtectRoute>
          }
        />
        <Route
          path="/password-reset"
          element={
            <ProtectRoute>
              <PasswordReset />
            </ProtectRoute>
          }
        />
        <Route path="*" element={<PageError />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
