import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/common/Spinner.jsx";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/Auth/authSlice.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  return (
    <div className="max-w-6xl w-5/6 flex rounded-2xl items-center justify-center  bg-light-gray shadow-md ">
      <div className="w-full px-6 md:w-2/6 mx-8 md:mb-0 ">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {isLoading ? <Spinner /> : ""}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="mr-2"
            />
            <div className="flex flex-row ">
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium text-gray mr-6"
              >
                Remember me
              </label>
              <p className="text-sm text-gray">
                <a href="#">Forgot Password?</a>
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="w-3/6 text-white  bg-olive-green rounded-2xl mt-4 py-2 ml-12 mb-2"
          >
            Login
          </button>
        </form>
        <p className="text-gray">
          Don't have an accound?
          <Link to="/users/" className="text-soft-orange hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
