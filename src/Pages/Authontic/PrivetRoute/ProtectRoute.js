import React from "react";
import useUser from "../../../hook/useUser";
import Loading from "../../Shared/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivetRoute;
