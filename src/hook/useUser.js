import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { getToken } from "../utils/token";

const useUser = () => {
  const authToken = getToken();
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/user", {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(response.data.user);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsLoggedIn(true);
        setError(err.response);
      });
  }, [authToken]);

  return { isLoggedIn, user, error, isLoading };
};

export default useUser;