import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, reset } from "../../features/Projects/projectSlice";
import { FaSpinner, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
// components

import UpdateProject from "../ProductOwner/UpdateProject/";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { projects, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.project
  );
  const { user } = useSelector((state) => state.auth);
  const filteredProjects = projects.filter((project) =>
    project.teamMembers !== null &&
    project.teamMembers.some(teammember => teammember._id === user.id)
);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllProjects());
      } catch (error) {
        toast.error("Error fetching projects");
      }
    };

    fetchData();

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

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
  const renderProjects = () => {
    if (isLoading) {
      return <Spinner size={30} />;
    }
    if (isError && message) {
      return toast.error(message);
    }

    if (isSuccess) {
      return (
        <div className="flex flex-col mx-16 gap-2">
          {!filteredProjects || filteredProjects.length === 0 ? (
            <p>Not assigned to a project Yet!.</p>
          ) : (
            <table className="table-auto ">
              <thead>
                {isLoading && <FaSpinner size={30} />}
                <tr className="bg-olive-green text-white">
                  <th className="text-left p-2 border border-light-gray">
                    No.
                  </th>
                  <th className="text-left p-2 border border-light-gray">
                    Project Name
                  </th>
                  <th className="text-left p-2 border border-light-gray hidden lg:flex md:flex">
                    Start Date
                  </th>
                  <th className="text-left p-2 border border-light-gray ">
                    Product Owner
                  </th>
                  <th className="text-left p-2 border border-light-gray">
                    Scrum Master
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, projectIndex) => (
                  <tr key={projectIndex} className="shadow-md my-4 rounded-2xl">
                    <td className="p-2">{projectIndex + 1}</td>
                    <td className="p-2">
                      <Link
                        className="hover:text-blue hover:text-lg"
                        to={`/dashboard/project/${project._id}`}
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="p-2 hidden lg:flex md:flex">
                      {project.startDate && handleDate(project.startDate)}
                    </td>
                    <td className="p-2 ">
                      <div className="flex flex-col justify-evenly items-center md:flex-row">
                        <div className="">
                          {project.projectOwner &&
                            project.projectOwner.username}
                        </div>
                        {project.projectOwner && (
                          <img
                            src={project.projectOwner.profileImage}
                            alt="Profile Image"
                            className="h-8 w-8 rounded-full"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-2 ">
                      <div className="flex flex-col justify-evenly items-center md:flex-row">
                        <div className="">
                          {project.scrumMaster &&
                            project.scrumMaster.username}
                        </div>
                        {project.scrumMaster && (
                          <img
                            src={project.scrumMaster.profileImage}
                            alt="Profile Image"
                            className="h-8 w-8 rounded-full"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <h1 className="text-3xl mb-4 text-center mx-8">My Projects</h1>
      {showUpdateModal && (
        <UpdateProject
          project_id={selectedProjectId}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
      {renderProjects()}
    </div>
  );
};

export default ProjectList;
