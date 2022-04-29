import React from "react";
import Social from "../Social/Social";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="flex flex-col items-center my-10">
      <div className="grid content-between rounded-md py-5 px-12 mx-auto register shadow-hard">
        <h2 className="text-3xl text-gray-600 font-bold text-center">Register</h2>
        <form className="">
          <input
            className="w-full border-b-2 border-gray-600 my-3 py-1 outline-none"
            type="text"
            placeholder="Name"
            name="name"
          />
          <br />
          <input
            className="w-full border-b-2 border-gray-600 my-3 py-1 outline-none"
            type="email"
            placeholder="Email"
            name="email"
          />
          <br />
          <input
            className="w-full border-b-2 border-gray-600 my-2 py-1 outline-none"
            type="password"
            name="password"
            placeholder="Password"
          />
          <br />
          <input
            className="w-full border-b-2 border-gray-600 my-2 py-1 outline-none"
            type="password"
            name="confirm_Password"
            placeholder="Confirm Password"
          />
          <input
            className="theme-color text-white w-full py-3 rounded-md mt-5 cursor-pointer"
            type="submit"
            value="Register"
          />
        </form>
        <p className="py-3">
          Already have an account? <Link className="link" to="/login">Login</Link>
        </p>
      </div>
      <Social />
    </section>
  );
};

export default Register;
