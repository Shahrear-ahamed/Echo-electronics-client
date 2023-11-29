import { jwtDecode } from "jwt-decode";

const getToken = () => {
  return localStorage.getItem("token");
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const decodedAuthToken = () => {
  const token = getToken();
  if (token && token !== "undefined" && token !== "null") {
    const data = jwtDecode(token);
    return data;
  }

  return null;
};

export { getToken, setToken, removeToken, decodedAuthToken };
