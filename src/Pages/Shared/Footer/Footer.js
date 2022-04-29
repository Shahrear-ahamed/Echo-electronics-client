import React from "react";
import { Link } from "react-router-dom";
import logoLight from "../../../images/logo/logo-dark.png";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="footer bg-gray-200">
      <div className="container mx-auto my-9">
        <div className="grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-3 items-center">
          <div>
            <img
              className="my-5 cursor-pointer"
              src={logoLight}
              alt="echo electronics logo"
              style={{ height: "45px" }}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <ul>
              <li className="footer-link">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="footer-link">
                <Link to="/about">About</Link>
              </li>
              <li className="footer-link">
                <Link to="/TremsAndCondition">Trems and Condition</Link>
              </li>
            </ul>
          </div>
          <div className="w-full grid justify-center">
            <ul className="flex justify-center ">
              <li className="mx-5 cursor-pointer icons">
                <a href="https://www.facebook.com/its.shahrear/" target="blank">
                  <FontAwesomeIcon className="font-icon" icon={faFacebookF} />
                </a>
              </li>
              <li className="mx-5 cursor-pointer icons">
                <Link to="/linkdin">
                  <FontAwesomeIcon className="font-icon" icon={faLinkedin} />
                </Link>
              </li>
              <li className="mx-5 cursor-pointer icons">
                <a href="https://github.com/Shahrear-ahamed" target="blank">
                  <FontAwesomeIcon className="font-icon" icon={faGithub} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-3 border-t-2 border-gray-300">
        <h2 className="text-center">
          &copy; {date} Echo Electornics. All rights reserved
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
