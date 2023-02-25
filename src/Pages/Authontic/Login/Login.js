import axios from "../../../utils/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Social from "../Social/Social";
import { setToken } from "../../../utils/token";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    let response;

    // get user data
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { email, password };

    // login user
    if (!email) {
      return toast.warn("Email is required");
    } else if (!password) {
      return toast.warn("Password is required");
    }

    try {
      response = await axios.post("/user/login", user);
    } catch (err) {
      response = err.response;
    }

    const resData = { ...response.data, statusCode: response.status };

    if (resData.statusCode !== 200) {
      return toast.error(resData.message);
    }

    // if user login successfully then redirect to home page
    navigate(from);
    setToken(resData.token);
    toast.success(resData.message);
  };

  // login page design are here
  return (
    <section className="flex flex-col items-center my-10">
      <div className="grid content-between rounded-md py-5 px-12 mx-auto register shadow-hard">
        <h2 className="text-3xl text-gray-600 font-bold text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="data-input w-full border-b-2 border-gray-600 my-3 py-1 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <br />
          <input
            className="data-input w-full border-b-2 border-gray-600 my-2 py-1 outline-none"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            className="data-input theme-color text-white w-full py-3 rounded-md mt-5 cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
        <div>
          <p className="pt-3">
            Forget Password?{" "}
            <Link className="link" to="/password-reset">
              Click here
            </Link>
          </p>
          <p className="py-3">
            New to Echo Electronics?{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Social />
    </section>
  );
};

export default Login;
