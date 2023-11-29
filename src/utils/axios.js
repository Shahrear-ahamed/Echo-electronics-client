import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "development"
      ? process.env.REACT_APP_BACKEND_URL
      : process.env.REACT_APP_LIVE_BACKEND_URL,
});

export default instance;
