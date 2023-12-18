import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUserById, reset, getAllUsers } from "../../features/users/userSlice";
import imageCompression from "browser-image-compression";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";

Modal.setAppElement("#root");

const UpdateUser = ({ userId, onClose }) => {
  const dispatch = useDispatch();
  const { user,users, isLoading, isError, isSuccess,message } = useSelector(
    (state) => state.users
  );
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    profileImage: "",
    username: "",
    email: "",
    role: "",
    isAdmin: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if the user is not loaded or if the user ID has changed
        if (!user || (user && user._id !== userId)) {
          const response = await dispatch(getUserById(userId));
          let selectedUser = response.payload.user;
          selectedUser &&
            setUpdatedData({
              firstName: selectedUser.firstName,
              lastName: selectedUser.lastName,
              birthDate: selectedUser.birthDate,
              profileImage: selectedUser.profileImage,
              username: selectedUser.username,
              email: selectedUser.email,
              role: selectedUser.role,
              isAdmin: selectedUser.isAdmin,
            });
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserData();
  }, [dispatch, userId]);

  // change date format  
  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
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
            setUpdatedData((prevState) => ({
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
      setUpdatedData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isAdmin = false;
    if (updatedData.role === "admin") {
      isAdmin = true;
    }

    // Add userId to userData
    const userData = {
      userId,
      ...updatedData,
      isAdmin,
    };
    dispatch(updateUser({userId,updatedData: userData}));
    if(isSuccess){
      setUpdatedData({});
      onClose();
      toast.success(message)
      dispatch(getAllUsers)
    }
  };
  return (
    <Modal
      isOpen={true}
      contentLabel="Update user Profile"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white text-black p-8 mx-12 rounded overflow-scroll">
        <div className="flex justify-end">
          <MdClose size={30} onClick={onClose} />
        </div>
        <h2 className="font-bold text-2xl text-center mb-12">Update User</h2>
        {isLoading && <FaSpinner />}
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <label htmlFor="firstName" className="mr-2">
            First name:
            <input
              type="text"
              name="firstName"
              value={updatedData.firstName}
              onChange={onChange}
              className="border-2 rounded-md ml-2 focus:outline-olive-green my-2"
            />
          </label>
          <label htmlFor="lastName" className="mr-2">
            Last name:
            <input
              type="text"
              name="lastName"
              value={updatedData.lastName}
              onChange={onChange}
              className="border-2 rounded-md ml-2 focus:outline-olive-green my-2"
            />
          </label>
          <label htmlFor="username" className="mr-2">
            Username:
            <input
              type="text"
              name="username"
              value={updatedData.username}
              onChange={onChange}
              className="border-2 rounded-md ml-2 focus:outline-olive-green my-2"
            />
          </label>
          <label htmlFor="birthDate" className="mr-2">
            Birth Date:
            <input
              type="date"
              name="birthDate"
              value={handleDate(updatedData.birthDate)}
              onChange={onChange}
              className="border-2 rounded-md ml-2 focus:outline-olive-green my-2"
            />
          </label>
          <label htmlFor="email" className="mr-2">
            Email:
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={onChange}
              className="border-2 rounded-md ml-2 focus:outline-olive-green my-2"
            />
          </label>
          <div className="my-8 gap-2">
            <label htmlFor="role" className="mr-2">
              <input
                type="radio"
                name="role"
                value="Product Owner"
                checked={updatedData.role === "Product Owner"}
                onChange={onChange}
              />
              Product Owner
            </label>
            <label htmlFor="role" className="mr-2">
              <input
                type="radio"
                name="role"
                value="Scrum Master"
                checked={updatedData.role === "Scrum Master"}
                onChange={onChange}
              />
              Scrum Master
            </label>
            <label htmlFor="role" className="mr-2">
              <input
                type="radio"
                name="role"
                value="Development Team"
                checked={updatedData.role === "Development Team"}
                onChange={onChange}
              />
              Development Team
            </label>
          </div>
          {/* image input */}
          <input type="file" name="profileImage" onChange={onChange} />
          {updatedData.profileImage && (
            <img
              src={updatedData.profileImage}
              alt="Profile Preview"
              className="mt-1 rounded-md h-32 w-32"
            />
          )}
          <div className="flex flex-row  justify-center">
            <button
              type="submit"
              className="border border-olive-green rounded-md text-olive-green font-bold hover:text-white hover:bg-olive-green w-24 mt-8 p-2"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
        {isError && toast.error(message)}
      </div>
    </Modal>
  );
};

export default UpdateUser;
