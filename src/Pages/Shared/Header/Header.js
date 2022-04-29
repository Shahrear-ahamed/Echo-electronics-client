import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import hamburgerMenu from "../../../images/bars-solid.svg";
import logoDark from "../../../images/logo/logo-dark.png";

const Header = () => {
  const navigate = useNavigate();

  const [hamburger, setHamburget] = useState(false);
  console.log(hamburger);

  return (
    <header>
      <div className="container py-4 mx-auto px-7 flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between w-full md:w-60">
          <button onClick={() => navigate("/")}>
            <img
              className="cursor-pointer"
              src={logoDark}
              alt="echo electronics logo"
              style={{ height: "45px" }}
            />
          </button>

          <button
            onClick={() => setHamburget(!hamburger)}
            className="block md:hidden"
          >
            <img
              src={hamburgerMenu}
              alt="hamburger item"
              style={{ width: "25px" }}
            />
          </button>
        </div>
        <div
          className={
            hamburger
              ? "block md:w-3/5 md:flex items-center justify-between"
              : "hidden md:w-3/5 md:flex items-center justify-between"
          }
        >
          <nav className="col-span-2 my-5 md:my-0">
            <Link className="mx-2" to="/">
              Home
            </Link>
            <Link className="mx-2" to="/manage-product">
              Manage Product
            </Link>
            <Link className="mx-2" to="/blog">
              Blog
            </Link>
          </nav>
          <div className="button-grp">
            <button
              onClick={() => navigate("/register")}
              className=" px-5 py-2 border-2 rounded-lg border-color"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 ml-6 rounded-lg border-2 text-white theme-color border-color"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
