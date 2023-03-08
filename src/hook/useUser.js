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
    // check authToken are available or not
    if (authToken) {
      axios("/user", {
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
          setIsLoggedIn(false);
          setError(err.response);
        });
    } else {
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  }, [authToken]);

  return { isLoggedIn, user, error, isLoading };
};

export default useUser;
