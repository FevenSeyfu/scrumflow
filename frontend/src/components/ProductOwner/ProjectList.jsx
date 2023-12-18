import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, reset } from "../../features/Projects/projectSlice";
import { FaSpinner, FaEdit, FaTrash } from "react-icons/fa";
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';
import { toast } from "react-toastify";
import CreateProject from "./CreateProject";

const ProjectList = () => {
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const { projects, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.project
  );
  const { user } = useSelector(
    (state) => state.auth
  ); 
  useEffect(() => {
    dispatch(getAllProjects(user.id));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderProjects = () => {
    if (!projects || projects.length === 0) {
        return <p>No projects available.</p>;
      }
    // Sort projects alphabetically by project name
    const sortedProjects = [...projects];
  
  // Sort projects alphabetically by project name
  sortedProjects.sort((a, b) => a.name.localeCompare(b.name));

    if (isError && message) {
      return toast.error(message);
    }

    if (isSuccess) {
      return (
        <div className="flex flex-col mx-16 gap-2">
            <button
              onClick={() => {
                setShowAddProjectModal(true);
              }}
              className="text-left text-blue bg-white hover:text-dark-blue hover:underline"
            >
               + Add Project
            </button>
          <table className="table-auto ">
            <thead>
              <tr className="bg-olive-green text-white">
                <th className="text-left p-2 border border-light-gray">No.</th>
                <th className="text-left p-2 border border-light-gray">Project Name</th>
                <th className="text-left p-2 border border-light-gray">
                  Start Date
                </th>
                <th className="text-left p-2 border border-light-gray">
                  End Date
                </th>
                <th className="text-left p-2 border border-light-gray">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, projectIndex) => (
                <tr key={project._id} className="shadow-md my-4 rounded-2xl">
                  <td className="p-2">{projectIndex + 1}</td>
                  <td className="p-2">{project.name}</td>
                  <td className="p-2">
                    {project.startDate && handleDate(project.startDate)}
                  </td>
                  <td className="p-2">
                    {project.endDate && handleDate(project.endDate)}
                  </td>
                  <td className="p-2 flex flex-row justify-between">
                    <FaEdit
                      className="text-green"
                      onClick={() => {
                        setSelectedProjectId(project._id);
                        setShowUpdateModal(true);
                        setShowDeleteModal(false);
                      }}
                    />
                    <FaTrash
                      className="text-red"
                      onClick={() => {
                        setSelectedProjectId(project._id);
                        setShowDeleteModal(true);
                        setShowUpdateModal(false);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl mb-4 text-center mx-8">My Projects</h1>
      {showUpdateModal && (
        <UpdateProject
          projectId={selectedProjectId}
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteProject
          projectId={selectedProjectId}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showAddProjectModal && (
        <CreateProject onClose={() => setShowAddProjectModal(false)} />
      )}
      {renderProjects()}
    </div>
  );
};

export default ProjectList;
