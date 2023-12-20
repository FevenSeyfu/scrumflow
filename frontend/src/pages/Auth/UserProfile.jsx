import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/Auth/authSlice";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";

Modal.setAppElement("#root");

const UserProfile = () => {
  const dispatch = useDispatch();
  const handleDate = (dateInput) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateInput);
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName} ${day}, ${year}`;
  };
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth);
  const {
    firstName,
    lastName,
    birthDate,
    email,
    profileImage,
    username,
    role,
  } = user;
  return (
    <Layout>
      <div className="w-80 h-auto p-4 bg-white rounded-md shadow-lg my-12 mx-auto shadow-olive-green">
        <div className="flex flex-col items-center ">
          <h2 className="text-2xl font-bold px-8 mb-4">User Profile</h2>
          <div>
            <img
              src={profileImage}
              alt={`${username} profile Picture`}
              className="rounded-full w-32 h-32 m-auto"
            />
            <p className="mb-2">
              <strong>First Name:</strong> {firstName}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {lastName}
            </p>
            <p className="mb-2">
              <strong>User Name:</strong> {username}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {email}
            </p>
            <p className="mb-2">
              <strong>Birth Date:</strong> {handleDate(birthDate)}
            </p>
            <p className="mb-2">
              <strong>User Role</strong> {role}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
