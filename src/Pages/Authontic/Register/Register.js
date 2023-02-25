import axios from "../../../utils/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Social from "../Social/Social";
import "./Register.css";
import { setToken } from "../../../utils/token";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // create user are here
  const handleRegister = async (e) => {
    e.preventDefault();
    let response;

    //  get user input data
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const userData = { name, email, password, confirmPassword };

    // confirm password and password are same or not
    if (password !== confirmPassword) {
      return toast.error("Password and confirm password are not match");
    }

    try {
      response = await axios.post("/user/register", userData);
    } catch (err) {
      response = err.response;
    }

    const resData = { ...response.data, statusCode: response.status };

    if (resData.statusCode !== 200) {
      return toast.error(resData.message);
    }

    // after successful register redirect to login page
    navigate(from);
    setToken(resData.token);
    toast.success(resData.message);
  };

  // register page design are here
  return (
    <section className="flex flex-col items-center my-10">
      <div className="grid content-between rounded-md py-5 px-12 mx-auto register shadow-hard">
        <h2 className="text-3xl text-gray-600 font-bold text-center">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <input
            className="w-full data-input border-b-2 border-gray-600 my-3 py-1 outline-none"
            type="text"
            placeholder="Name"
            name="name"
            required
          />
          <br />
          <input
            className="w-full data-input border-b-2 border-gray-600 my-3 py-1 outline-none"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <br />
          <input
            className="w-full data-input border-b-2 border-gray-600 my-2 py-1 outline-none"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <br />
          <input
            className="w-full data-input border-b-2 border-gray-600 my-2 py-1 outline-none"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
          <input
            className="theme-color data-input text-white w-full py-3 rounded-md mt-5 cursor-pointer"
            type="submit"
            value="Register"
          />
        </form>
        <p className="py-3">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </div>
      <Social />
    </section>
  );
};

export default Register;
