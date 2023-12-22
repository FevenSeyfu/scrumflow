import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getAllProjects } from "../../features/Projects/projectSlice";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";

Modal.setAppElement("#root");

const DeleteProject = ({ project_id, onClose }) => {
  const dispatch = useDispatch();
  const { projects, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.project
  );
  let selectedProject;
  projects.forEach((project) => {
    project._id === project_id && (selectedProject = project.name);
  });

  const { user } = useSelector((state) => state.auth);
  const handleDelete = async() => {
    await dispatch(deleteProject(project_id));
    if(isSuccess){
      onClose()
      toast.info('Project Deleted!')
      dispatch(getAllProjects());
    }
  };

  
  const handleClose = () => {
    onClose();
  };
  
  return (
    <Modal
      isOpen={true}
      contentLabel="Delete Project"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white text-black p-8 mx-12 rounded">
        <div className="flex justify-end">
          <MdClose size={30} onClick={onClose} />
        </div>
        <h2 className="font-bold text-2xl text-center mb-4">Delete Project</h2>
        {isLoading && <FaSpinner />}
        <p>Are you sure you want to delete project?</p>
        <div className="flex flex-row justify-evenly mt-4">
          <button
            className="bg-red text-white p-2 rounded-md"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button className="bg-gray text-white p-2 rounded-md" onClick={handleClose} disabled={isLoading}>
            Cancel
          </button>
        </div>
        {isError && toast.error(message)}
        
      </div>
    </Modal>
  );
};

export default DeleteProject;
