import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import Social from "../Social/Social";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, userLogin, , errorLogin] =
    useSignInWithEmailAndPassword(auth);

  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (userLogin) {
      navigate(from);
      toast.success("Success fully login");
    } else if (user) {
      navigate("/");
      toast.warning("Already login with an account");
    }
  });

  useEffect(() => {
    if (errorLogin) {
      toast.error(errorLogin.code);
    }
  }, [errorLogin]);

  // handle user login
  const handleLogin = (e) => {
    e.preventDefault();

    // get uesr data
    const email = e.target.email.value;
    const password = e.target.password.value;
    // login user
    signInWithEmailAndPassword(email, password);
    // make jwt token for ueser
    
  };

  // login page design are here
  return (
    <section className="flex flex-col items-center my-10">
      <div className="grid content-between rounded-md py-5 px-12 mx-auto register shadow-hard">
        <h2 className="text-3xl text-gray-600 font-bold text-center">Login</h2>
        <form onSubmit={handleLogin}>
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
          <input
            className="theme-color text-white w-full py-3 rounded-md mt-5 cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
        <p className="py-3">
          New to Echo Electronics?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>
      <Social />
    </section>
  );
};

export default Login;
