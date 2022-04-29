import React from "react";
import "./PageError.css";
import errorPage from "../../../images/page-error.gif";
import { useNavigate } from "react-router-dom";

const PageError = () => {
  const navigate = useNavigate();
  return (
    <section className="grid justify-items-center">
      <div className="">
        <img src={errorPage} alt="error page info pic" />
        <h2 className="text-center font-semibold text-3xl">
          OPPS! PAGE NOT FOUND{" "}
        </h2>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="py-2 px-6 my-5 text-white rounded-md theme-color"
            style={{ width: "90px" }}
          >
            Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default PageError;
