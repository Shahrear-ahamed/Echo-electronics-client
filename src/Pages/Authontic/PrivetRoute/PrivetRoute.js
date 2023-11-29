import Loading from "../../Shared/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import { decodedAuthToken } from "../../../utils/token";
import { useEffect } from "react";
import { useState } from "react";

const PrivetRoute = ({ children }) => {
  const [user, setUser] = useState({
    loading: true,
  });

  useEffect(() => {
    const user = decodedAuthToken();

    setUser({ ...user, loading: false });
  }, []);

  const location = useLocation();

  if (user?.loading) {
    return <Loading />;
  }

  if (!user?.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivetRoute;
