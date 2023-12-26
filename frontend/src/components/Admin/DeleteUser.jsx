import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, reset } from "../../features/users/userSlice";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";

Modal.setAppElement("#root");

const DeleteUser = ({ userId, onClose }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const { users,isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );
  let selectedUser
  users.forEach((user) => {
    user._id === userId && (selectedUser = user.username)
    
  })
  const handleDelete = () => {
    setIsDeleting(true);
    dispatch(deleteUser(userId));
  };

  const handleClose = () => {
    setIsDeleting(false);
    onClose();
  };
  return (
    <Modal
      isOpen={true}
      contentLabel="Delete User Profile"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white text-black p-8 mx-12 rounded">
        <div className="flex justify-end">
          <MdClose size={30} onClick={onClose} />
        </div>
        <h2 className="font-bold text-2xl text-center mb-4">Delete User</h2>
        {isLoading && <FaSpinner />}
        <p>Are you sure you want to delete <b>{selectedUser}'s</b>  Profile?</p>
        <div className="flex flex-row justify-evenly mt-4">
          <button
            className="bg-red text-white p-2 rounded-md"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button className="bg-gray text-white p-2 rounded-md" onClick={handleClose} disabled={isLoading}>
            Cancel
          </button>
        </div>
        {isError && <p>Error: {message}</p>}
      </div>
    </Modal>
  );
};

export default DeleteUser;
