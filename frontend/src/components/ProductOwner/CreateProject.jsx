import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject,reset } from "../../features/Projects/projectSlice";
import { getAllUsers } from "../../features/users/userSlice";
import Select from "react-select";
import { toast } from "react-toastify";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { users, isLoading,isError,isSuccess } = useSelector((state) => state.users);
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
  }, [users,isLoading,isError, isSuccess]);

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
    const selectedValues = selectedOptions.map((option) => option.value);

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
    const devTeamID = projectData.teamMembers && projectData.teamMembers.value;

    dispatch(
      createProject({
        ...projectData,
        scrumMaster: scrumMasterId,
        teamMembers: devTeamID,
      })
    );
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('Project created successfully')
    }
  };

  return (
    <div>
      <h2>Create New Projects</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={projectData.name}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="textarea"
          id="description"
          name="description"
          value={projectData.description}
          onChange={handleInputChange}
        />
        <label htmlFor="description">StartDate:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={projectData.startDate}
          onChange={handleInputChange}
        />
        <label htmlFor="scrumMaster">Scrum Master:</label>
        <Select
          id="scrumMaster"
          name="scrumMaster"
          value={projectData.scrumMaster}
          onChange={handleScrumMasterChange}
          options={scrumMasterOptions}
        />
        <label htmlFor="teamMembers">Development Team:</label>
        <Select
          id="teamMembers"
          name="teamMembers"
          value={projectData.teamMembers}
          onChange={handleTeamMemeberChange}
          options={devTeamOptions}
          isMulti
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
