import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/common/Spinner.jsx";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../../features/Auth/authSlice.js";
import imageCompression from "browser-image-compression";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    profileImage: "",
    username: "",
    email: "",
    password: "",
    role: "",
    isAdmin: false,
  });
  const {
    firstName,
    lastName,
    birthDate,
    username,
    email,
    profileImage,
    password,
    role,
  } = formData;
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
      navigate("/users/login");
      dispatch(reset());
    }
  
    
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = async (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];

      if (file) {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 800,
          });

          const reader = new FileReader();

          reader.onloadend = () => {
            setFormData((prevState) => ({
              ...prevState,
              profileImage: reader.result,
            }));
          };

          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error("Error compressing image:", error);
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let isAdmin=  false;
    if (role === "admin") {
      isAdmin = true;
    }
    const userData = {
      firstName,
      lastName,
      birthDate,
      username,
      email,
      profileImage,
      password,
      role,
      isAdmin
    };

    dispatch(register(userData));
  };
  return (
    <div className="w-2/5  m-auto flex justify-center my-8 py-8 px-8 rounded-2xl  bg-dark-blue text-white shadow-md ">
      <div className="w-full flex flex-col justify-center items-center px-8">
        <h2 className="text-2xl font-bolder mb-2 text-center">Sign up</h2>
        {isLoading ? <Spinner /> : ""}
        <form onSubmit={onSubmit}>
          <div className="flex flex-row justify-between gap-2 pb-1">
            <div className="w-2/5">
              <label
                htmlFor="firstName"
                className="block mt-2 text-sm font-medium text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1  w-full border focus:border rounded-md p-1 text-black"
                value={firstName}
                onChange={onChange}
                required
              />
            </div>
            <div className="w-2/5">
              <label
                htmlFor="lastName"
                className="block mt-2 text-sm font-medium text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 w-full border focus:border rounded-md p-1 text-black"
                value={lastName}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-2 pb-1">
            <div className="w-2/5">
              <label
                htmlFor="username"
                className="block mt-2 text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1  w-full border focus:border rounded-md p-1 text-black"
                value={username}
                onChange={onChange}
                required
              />
            </div>
            <div className="w-2/5">
              <label
                htmlFor="birthDate"
                className="block mt-2 text-sm font-medium text-white"
              >
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className="mt-1 w-full border focus:border rounded-md p-1 text-black"
                value={birthDate}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-2 pb-4">
            <div className="w-2/5">
              <label
                htmlFor="email"
                className="block mt-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full border focus:border rounded-md p-1 text-black"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="w-2/5">
              <label
                htmlFor="password"
                className="block mt-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full border rounded-md p-1 text-black"
                value={password}
                onChange={onChange}
              />
            </div>
          </div>
          {/* role checkbox */}
          <div className="flex flex-row justify-between items-start mb-4">
            <div className="flex flex-row items-start">
              {/* Radio buttons for user roles */}
              <label className="text-sm font-medium text-white mr-2 ">
                Select Role:
              </label>
              <div className="flex flex-row w-4/5 gap-4 flex-wrap">
                <label className="whitespace-nowrap">
                  <input
                    type="radio"
                    id="owner"
                    name="role"
                    value="Product Owner"
                    checked={role === "Product Owner"}
                    onChange={onChange}
                  />
                  Product Owner
                </label>
                {/*  */}
                <label className="whitespace-nowrap">
                  <input
                    type="radio"
                    id="Scrum-Master"
                    name="role"
                    value="Scrum Master"
                    checked={role === "Scrum Master"}
                    onChange={onChange}
                  />
                  Scrum Master
                </label>
                {/*  */}
                <label className="whitespace-nowrap">
                  <input
                    type="radio"
                    id="Development Team"
                    name="role"
                    value="Development Team"
                    checked={role === "Development Team"}
                    onChange={onChange}
                  />
                  Development Team
                </label>
                {/*  */}
                {/* <label className="whitespace-nowrap">
                  <input
                    type="radio"
                    id="admin"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={onChange}
                  />
                  Admin
                </label> */}
              </div>
            </div>
          </div>
          {/* image input */}
          <div className="w-full pb-2">
          {profileImage && (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="mt-1 rounded-md h-40 w-auto"
              />
            )}
            <label
              htmlFor="profileImage"
              className="block mt-2 text-sm font-medium text-white"
            >
              Insert Profile Picture
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              className="mt-1 w-full border focus:border rounded-md"
              onChange={onChange}
            />
            
          </div>
          <div className="flex  flex-row justify-between items-center mb-4">
            <div className="flex flex-row">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="mr-2"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium text-white mr-6"
              >
                Remember me
              </label>
              <div className="flex justify-end">
                <p className="text-sm text-white">
                  Already have an account?
                  <Link
                    to="/users/login"
                    className="text-olive-green hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white  bg-olive-green py-2 px-4 rounded-lg"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
