import React from "react";
import google from "../../../images/Google-logo.svg";

const Social = () => {
  return (
    <div className="mt-8 mb-10">
      <button className="flex items-center shadow-md rounded-full text-lg py-3 px-32">
        <img style={{width:"35px"}} src={google} alt="" /> 
        <p className="ml-3 font-semibold">Continue with Google</p>
      </button>
    </div>
  );
};

export default Social;
