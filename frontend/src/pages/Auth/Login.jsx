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
      toast.success(message)
      navigate("/dashboard");
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
    <div className="w-2/5  m-auto flex justify-center my-12 py-8 rounded-2xl  bg-dark-blue text-white shadow-md ">
      <div className="w-full flex flex-col justify-center items-center px-8">
        <h2 className="text-3xl font-extrabold mb-4 text-center">Sign In</h2>
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
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md text-black"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-light-gray"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md text-black"
              value={password}
              onChange={onChange}
              required
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
            Sign In
          </button>
        </form>
        <p className="text-gray">
          Don't have an accound?
          <Link to="/users/" className="text-olive-green hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
