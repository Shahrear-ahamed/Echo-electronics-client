import React from "react";
import logoLight from "../../../images/logo/logo-dark.png";
import "./Footer.css";

const Footer = () => {
  const date = new Date().getFullYear();
  console.log(date);
  return (
    <footer className="footer bg-gray-200 flex justify-center items-center flex-col">
      <img
        className="my-5 cursor-pointer"
        src={logoLight}
        alt="echo electronics logo"
        style={{ height: "45px" }}
      />
      <h2>&copy; {date} Echo Electornics. All rights reserved</h2>
    </footer>
  );
};

export default Footer;
