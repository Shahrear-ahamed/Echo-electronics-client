import React from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Social from "../Social/Social";
import "./Register.css";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const from = location.state?.from?.pathname || "/";

  // create user are here
  const handleRegister = async (e) => {
    e.preventDefault();

    if (user) {
      return toast.error("You are already log in.");
    }
    //  get user input data
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // confirm password and password are same or not
    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
      await sendEmailVerification(email);
      // await navigate(from);
    } else {
      toast.error("Password and confirm password are not match");
    }
  };

  console.log(errorCreate);

  // register page design are here
  return (
    <section className="flex flex-col items-center my-10">
      <div className="grid content-between rounded-md py-5 px-12 mx-auto register shadow-hard">
        <h2 className="text-3xl text-gray-600 font-bold text-center">
          Register
        </h2>
        <form onSubmit={handleRegister}>
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
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <input
            className="theme-color text-white w-full py-3 rounded-md mt-5 cursor-pointer"
            type="submit"
            value="Register"
          />
        </form>
        <p className="py-3">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </div>
      <Social />
    </section>
  );
};

export default Register;
