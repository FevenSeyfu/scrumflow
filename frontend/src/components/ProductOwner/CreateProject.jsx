import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject,reset } from '../../features/Projects/projectSlice'
import Select from "react-select"; 

const CreateProject = () => {
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    scrumMaster: "",
    teamMembers: [],
    tasks: [],
    status:'open'
  });
  const [scrumMasterOptions, setScrumMasterOptions] = useState([]);
  const [devTeamOptions, setDevTeamOptions] = useState([]);
  // const { name,description,startDate,scrumMaster,teamMembers,tasks,status } = projectData;

  useEffect(() => {
    // dispatch getallusers

    // add options for the Scrum Master dropdown
    const ScrumOptions = users
      .filter((user) => user.role === "Scrum Master")
      .map((user) => ({
        value: user._id,
        label: user.username, 
      }));
      setScrumMasterOptions(ScrumOptions);

      // add options for the Team memebers dropdown
    const devOptions = users
    .filter((user) => user.role === "Development Team")
    .map((user) => ({
      value: user._id,
      label: user.username, 
    }));
    setDevTeamOptions(devOptions);
    }, [users]);
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
          id="StartDate"
          name="StartDate"
          value={projectData.StartDate}
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
        <label htmlFor="teamMembers">Scrum Master:</label>
        <Select
          id="teamMembers"
          name="teamMembers"
          value={projectData.teamMembers}
          onChange={handleTeamMemeberChange}
          options={devTeamOptions}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  )
}

export default CreateProject