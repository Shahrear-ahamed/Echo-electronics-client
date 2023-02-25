import "./Header.css";
import { useState } from "react";
import { removeToken } from "../../../utils/token";
import { NavLink, useNavigate } from "react-router-dom";
import logoDark from "../../../images/logo/logo-dark.png";
import hamburgerMenu from "../../../images/bars-solid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = ({ authUser }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = authUser;
  const [hamburger, setHamburger] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const logOut = () => {
    removeToken();
  };

  return (
    <header className="shadow-md z-50">
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
            onClick={() => setHamburger(!hamburger)}
            className="block md:hidden ">
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
          }>
          <div
            onClick={() => setHamburger(!hamburger)}
            className="col-span-2 my-5 md:my-0">
            {" "}
            <nav className="flex flex-col items-start md:flex-row ">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "mx-2 text-color" : "mx-2 text-black header-link"
                }
                to="/">
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "mx-2 text-color" : "mx-2 text-black header-link"
                }
                to="/manage-inventory">
                Manage Inventory
              </NavLink>
              {isLoggedIn ? (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "mx-2 text-color"
                        : "mx-2 text-black header-link"
                    }
                    to="/add-items">
                    Add Items
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "mx-2 text-color"
                        : "mx-2 text-black header-link"
                    }
                    to="/my-items">
                    My Items
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "mx-2 text-color"
                        : "mx-2 text-black header-link"
                    }
                    to="/blog">
                    Blog
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          {/* user interaction are here login or logout */}

          <div className="button-grp relative">
            {isLoggedIn ? (
              <div className="relative">
                <div
                  className="flex justify-between items-center gap-3 cursor-pointer"
                  onClick={() => setProfileDropdown(!profileDropdown)}>
                  {user?.photo ? (
                    <img
                      src={user?.photo}
                      alt={user?.name}
                      className="w-7 h-7 rounded-full overflow-hidden"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="w-7 h-7" />
                  )}

                  <p className="text-sm">{user?.name}</p>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-4 h-4 duration-300 ${
                      profileDropdown ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </div>

                {/* // user profile */}
                <div className="hidden">
                  <button
                    onClick={logOut}
                    className=" px-5 py-2 border-2 rounded-lg border-color">
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className=" px-5 py-2 border-2 rounded-lg border-color">
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 ml-6 rounded-lg border-2 text-white theme-color border-color">
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
