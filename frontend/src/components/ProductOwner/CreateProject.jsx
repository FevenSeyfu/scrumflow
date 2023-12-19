import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  getAllProjects,
  reset,
} from "../../features/Projects/projectSlice";
import { getAllUsers } from "../../features/users/userSlice";
import Select from "react-select";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";
Modal.setAppElement("#root");

const CreateProject = ({ onClose }) => {
  const dispatch = useDispatch();
  const { users} = useSelector(
    (state) => state.users
  );
  const { projects,isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.project
  );
  const { user } = useSelector((state) => state.auth);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    scrumMaster: "",
    teamMembers: [],
    tasks: [],
    status: "open",
  });
  const [scrumMasterOptions, setScrumMasterOptions] = useState([]);
  const [devTeamOptions, setDevTeamOptions] = useState([]);

  useEffect(() => {
    // dispatch getallusers
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    // add options for the Scrum Master Selection
    const ScrumOptions = users
      .filter((user) => user.role === "Scrum Master")
      .map((user) => ({
        value: user._id,
        label: user.username,
      }));
    setScrumMasterOptions(ScrumOptions);

    // add options for the Team members dropdown
    const devOptions = users
      .filter((user) => user.role === "Development Team")
      .map((user) => ({
        value: user._id,
        label: user.username,
      }));
    setDevTeamOptions(devOptions);
  }, [users, isLoading, isError, isSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleScrumMasterChange = (selectedOption) => {
    setProjectData((prevData) => ({
      ...prevData,
      scrumMaster: selectedOption,
    }));
  };

  const handleTeamMemeberChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
    }));

    setProjectData((prevData) => ({
      ...prevData,
      teamMembers: selectedValues,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // get ScrumMaster's id
    const scrumMasterId =
      projectData.scrumMaster && projectData.scrumMaster.value;
    // fetch selected development team member's Id
    const devTeamIDs =
      projectData.teamMembers?.map((member) => member.value) || [];

    dispatch(
      createProject({
        ...projectData,
        scrumMaster: scrumMasterId,
        teamMembers: devTeamIDs,
      })
    );
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      onClose();
      toast.success("Project created successfully");
      dispatch(getAllProjects(user.id))
    }
  };

  return (
    <Modal
      isOpen={true}
      contentLabel="Create New Project"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white text-black p-8 mx-12 shadow-md shadow-dark-blue rounded-xl">
        <div className="flex justify-end">
          <MdClose size={30} onClick={onClose} />
        </div>
        <h2 className="font-bold text-2xl text-center">
          Create New Project
        </h2>
        {isLoading && <FaSpinner />}
        <form
          onSubmit={handleFormSubmit}
          className="p-8 shadow-lg rounded-md flex flex-col "
        >
          <div className="flex flex-col md:flex-row  md:gap-4 md:items-center">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleInputChange}
            className="border border-gray rounded-md  py-1 focus:outline-blue"
            required
          />
          <label htmlFor="description">Start Date: </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={projectData.startDate}
            onChange={handleInputChange}
            className="border border-gray rounded-md  py-1 focus:outline-blue"
            required
          />
          </div>
          <label htmlFor="description" className="flex flex-col  mt-2">
            Description:
            <textarea
              rows={5}
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              className="border border-gray rounded-md  py-1 focus:outline-blue"
              required
            />
          </label>
          <div className="flex flex-col">
            <label htmlFor="scrumMaster" className="pt-4">
              Scrum Master:
            </label>
            <Select
              id="scrumMaster"
              name="scrumMaster"
              value={projectData.scrumMaster}
              onChange={handleScrumMasterChange}
              options={scrumMasterOptions}
              required
            />
            <label htmlFor="teamMembers" className="pt-4">
              Development Team:
            </label>
            <Select
              id="teamMembers"
              name="teamMembers"
              value={projectData.teamMembers}
              onChange={handleTeamMemeberChange}
              options={devTeamOptions}
              isMulti
            />
          </div>
          <div className="flex justify-center my-2">
            <button
              type="submit"
              className="p-2 border rounded-md border-olive-green text-olive-green font-bold hover:bg-olive-green hover:text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProject;
