import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-section text-white text-center grid justify-center items-center">
      <div className="w-10/12 mx-auto">
        <h2 className="sm:text-4xl text-2xl font-semibold">
          Welcome to{" "}
          <span className="theme-color px-2 title">Echo Warehouse</span>
        </h2>
        <p className="my-4 px-4 text-sm sm:text-base">
          Founded in 2007, Echo Electronics is specializing in providing
          innovative services such as inventory management.
        </p>
        <button
          className="mt-4 px-5 py-2 rounded-md theme-color"
          onClick={() => navigate("/blog")}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
