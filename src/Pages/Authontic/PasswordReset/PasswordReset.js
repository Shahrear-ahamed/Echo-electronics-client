import React, { useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import Social from "../Social/Social";

const PasswordReset = () => {
  const [sendPasswordResetEmail, , error] = useSendPasswordResetEmail(auth);
  useEffect(() => {
    if (error) {
      toast.error(error.code);
    }
  }, [error]);

  // send email
  const handlePasswordReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      sendPasswordResetEmail(email);
      toast.success("Password reset mail was sent");
    } else {
      toast.error("Please input email address");
    }
  };
  return (
    <section className="flex flex-col items-center my-10">
      <div className="grid content-between rounded-md py-5 px-12 mx-auto register shadow-hard">
        <h2 className="text-3xl text-gray-600 font-bold text-center">Login</h2>
        <form onSubmit={handlePasswordReset}>
          <input
            className="data-input w-full border-b-2 border-gray-600 my-3 py-1 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <br />
          <input
            className="data-input theme-color text-white w-full py-3 rounded-md mt-5 cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
        <div>
          <p className="pt-3">
            Login?{" "}
            <Link className="link" to="/login">
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

export default PasswordReset;
