import axios from "axios";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import google from "../../../images/Google-logo.svg";

const Social = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithGoogle, userGoogle, , error] = useSignInWithGoogle(auth);
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (error) {
      toast.error(error.code);
    }
  }, [error]);

  useEffect(() => {
    if (userGoogle) {
      const setJwt = async () => {
        const email = userGoogle.user.email;
        // send data to backend for jwt
        const token = await axios.post("https://echo-electronics.herokuapp.com/generatetoken", {
          email,
        });
        localStorage.setItem("access_token", token.data.jwToken);
        navigate(from);
        toast.success("Successfully Login");
      };
      setJwt();
    }
  });

  // social login design
  return (
    <div className="mt-8 mb-10">
      <button
        onClick={() => signInWithGoogle()}
        className="flex items-center shadow-md rounded-full text-lg py-3 px-10 md:px-32"
      >
        <img style={{ width: "35px" }} src={google} alt="" />
        <p className="ml-3 text-base font-semibold">Continue with Google</p>
      </button>
    </div>
  );
};

export default Social;
