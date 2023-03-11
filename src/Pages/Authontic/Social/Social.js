import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import google from "../../../images/Google-logo.svg";
import { getToken } from "../../../utils/token";

const Social = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasUser = getToken();
  const from = location.state?.from?.pathname || "/";
  const url = process.env.REACT_APP_GOOGLE_LOGIN_URL;

  const signInWithGoogle = () => {
    if (!hasUser) {
      window.open(url, "_self");
    }
  };

  // social login design
  return (
    <div className="mt-8 mb-10">
      <button
        onClick={() => signInWithGoogle()}
        className="flex items-center shadow-md rounded-full text-lg py-3 px-10 md:px-32">
        <img style={{ width: "35px" }} src={google} alt="" />
        <p className="ml-3 text-base font-semibold">Continue with Google</p>
      </button>
    </div>
  );
};

export default Social;
