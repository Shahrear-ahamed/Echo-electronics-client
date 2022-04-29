import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logoLight from "../../../images/logo/logo-light.png";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto px-7 flex justify-between items-center">
        <div>
          <img
            className="my-5 cursor-pointer"
            src={logoLight}
            alt="echo electronics logo"
            style={{ height: "45px" }}
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <nav className="col-span-2">
            <Link to="/">Home</Link>
          </nav>
          <div className="button-grp">
            <button className=" px-5 py-2 ml-6 border-2 rounded-lg border-color">
              Register
            </button>
            <button className="px-5 py-2 ml-6 rounded-lg border-2 text-white button-color border-color">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
