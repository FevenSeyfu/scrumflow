import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProject,
  getProjectById,
  getAllProjects,
  reset,
} from "../../features/Projects/projectSlice";
import { getAllUsers } from "../../features/users/userSlice";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Select from "react-select";

Modal.setAppElement("#root");

const UpdateProject = ({ project_id, onClose }) => {
  const dispatch = useDispatch();
  const { project, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.project
  );
  const projects = useSelector((state) => state.project.projects); // Adjust as needed
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const [updatedData, setUpdatedData] = useState({
    name: "",
    startDate: "",
    scrumMaster: "",
    description: "",
    teamMembers: [],
    tasks: [],
    status: "open",
    projectOwner: "",
  });

  const [selectedScrumMaster, setSelectedScrumMaster] = useState(null);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [scrumMasterOptions, setScrumMasterOptions] = useState([]);
  const [devTeamOptions, setDevTeamOptions] = useState([]);
  useEffect(() => {
    // Dispatch getAllUsers
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        if (!project || (project && project._id !== project_id)) {
          await dispatch(getProjectById(project_id));
          const selectedProject = projects.find(
            (project) => project._id === project_id
          );

          if (selectedProject) {
            setUpdatedData({
              name: selectedProject.name || "",
              startDate: selectedProject.startDate
                ? new Date(selectedProject.startDate)
                    .toISOString()
                    .split("T")[0]
                : "",
              description: selectedProject.description || "",
              projectOwner: user.id || "",
              scrumMaster: selectedProject.scrumMaster?._id || "",
              teamMembers:
                selectedProject.teamMembers?.map((member) => member._id) || [],
              tasks: [],
              status: "open",
            });
            setSelectedScrumMaster(selectedProject.scrumMaster);
            setSelectedTeamMembers(
              selectedProject.teamMembers?.map((member) => member._id) || []
            );
          }
        }

        // Set options for Scrum Master
        const scrumOptions = users
          .filter((user) => user.role === "Scrum Master")
          .map((user) => ({
            value: user._id,
            label: user.username,
          }));

        // Set options for Development Team
        const devOptions = users
          .filter((user) => user.role === "Development Team")
          .map((user) => ({
            value: user._id,
            label: user.username,
          }));

        setScrumMasterOptions(scrumOptions);
        setDevTeamOptions(devOptions);
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchProjectData();
  }, [dispatch, project_id, projects, user.id, users]);

  const handleScrumMasterChange = (selectedOption) => {
    setUpdatedData((prevState) => ({
      ...prevState,
      scrumMaster: selectedOption.value,
    }));
    setSelectedScrumMaster(selectedOption);
  };

  const handleTeamMemberChange = (selectedOptions) => {
    setUpdatedData((prevState) => ({
      ...prevState,
      teamMembers: selectedOptions.map((option) => option.value),
    }));
    setSelectedTeamMembers(selectedOptions);
  };

  const onChange = (e) => {
    setUpdatedData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const scrumMasterId = selectedScrumMaster?.value || "";
      const devTeamIDs =
        selectedTeamMembers.map((member) => member.value) || [];

      const projectData = {
        ...updatedData,
        scrumMaster: scrumMasterId,
        teamMembers: devTeamIDs,
      };
      await dispatch(updateProject({projectData, project_id}));

      if (isSuccess) {  
        await dispatch(getAllProjects());
        setUpdatedData({
          name: "",
          startDate: "",
          scrumMaster: "",
          description: "",
          teamMembers: [],
          tasks: [],
          status: "open",
          projectOwner: "",
        });

        onClose();
        toast.success("Project updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Modal
      isOpen={true}
      contentLabel="Update Project"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white text-black p-8 mx-12 shadow-md shadow-dark-blue rounded-xl">
        <div className="flex justify-end">
          <MdClose size={30} onClick={onClose} />
        </div>
        <h2 className="font-bold text-2xl text-center">Update Project</h2>
        {isLoading && <FaSpinner />}
        <form
          onSubmit={handleFormSubmit}
          className="p-8 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex flex-col md:flex-row  md:gap-4 md:items-center">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedData.name}
              onChange={onChange}
              className="border border-gray rounded-md  py-1 focus:outline-blue"
              required
            />
            <label htmlFor="description">Start Date: </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={updatedData.startDate}
              onChange={onChange}
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
              value={updatedData.description}
              onChange={onChange}
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
              value={scrumMasterOptions.find(
                (option) => option.value === updatedData.scrumMaster
              )}
              onChange={handleScrumMasterChange}
              options={scrumMasterOptions}
            />
            <label htmlFor="teamMembers" className="pt-4">
              Development Team:
            </label>
            <Select
              id="teamMembers"
              name="teamMembers"
              value={updatedData.teamMembers.map((member) =>
                devTeamOptions.find((option) => option.value === member)
              )}
              onChange={handleTeamMemberChange}
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
              {isLoading ? "Updating..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateProject;
