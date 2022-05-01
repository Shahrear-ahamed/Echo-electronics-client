import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import google from "../../../images/Google-logo.svg";

const Social = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);

  const from = location.state?.from?.pathname || "/";
  return (
    <div className="mt-8 mb-10">
      <button className="flex items-center shadow-md rounded-full text-lg py-3 px-10 md:px-32">
        <img style={{ width: "35px" }} src={google} alt="" />
        <p className="ml-3 text-base font-semibold">Continue with Google</p>
      </button>
    </div>
  );
};

export default Social;
