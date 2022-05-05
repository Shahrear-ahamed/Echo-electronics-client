import axios from "axios";
import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import Social from "../Social/Social";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithEmailAndPassword, userLogin, , errorLogin] =
    useSignInWithEmailAndPassword(auth);

  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (userLogin) {
      navigate(from);
      toast.success("Success fully login");
    }
  });

  useEffect(() => {
    if (errorLogin) {
      toast.error(errorLogin.code);
    }
  }, [errorLogin]);

  // handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    // get uesr data
    const email = e.target.email.value;
    const password = e.target.password.value;
    // login user
    if (email && password) {
      await signInWithEmailAndPassword(email, password);
      const token = await axios.post("https://echo-electronics.herokuapp.com/generatetoken", {
        email,
      });
      localStorage.setItem("access_token", token.data.jwToken);
    }
    // make jwt token for ueser
  };

  // login page design are here
  return (
    <section className="flex flex-col items-center my-10">
      <div className="grid content-between rounded-md py-5 px-12 mx-auto register shadow-hard">
        <h2 className="text-3xl text-gray-600 font-bold text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="data-input w-full border-b-2 border-gray-600 my-3 py-1 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <br />
          <input
            className="data-input w-full border-b-2 border-gray-600 my-2 py-1 outline-none"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            className="data-input theme-color text-white w-full py-3 rounded-md mt-5 cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
        <div>
          <p className="pt-3">
            Forget Passowrd?{" "}
            <Link className="link" to="/password-reset">
              Click here
            </Link>
          </p>
          <p className="py-3">
            New to Echo Electronics?{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Social />
    </section>
  );
};

export default Login;
