import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjects,
  getProjectById,
  reset,
} from "../../../features/Projects/projectSlice";
import { FaSpinner, FaUser, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import TasksList from "../../Tasks/TasksList";
import Layout from "../../common/Layout";
const ProjectDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskId = "6582d920e6e43567f49fac7d";
  const { id: project_id } = useParams();
  const onClose = () => {
    navigate("/dashboard/");
  };
  useEffect(() => {
    dispatch(getAllProjects());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  const { projects, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.project
  );
  const projectDetail = projects.find((project) => project._id === project_id);
  const ProjectTasks = projectDetail.tasks;
  useEffect(() => {
    dispatch(getProjectById(project_id));
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

  return (
    <Layout>
      <div className="bg-white text-black  rounded-xl p-4 w-full">
        <div className="flex justify-start items-center mb-8">
          <FaArrowLeft onClick={onClose} />
          <h2 className="font-bold text-2xl text-center  whitespace-normal">
            {projectDetail.name}
          </h2>
        </div>
        {isLoading && <FaSpinner />}
        {isError && toast.error(message)}
        {isSuccess && (
          <div className="flex flex-col gap-2 justify-center items-start md:flex-row p-8 shadow-md shadow-dark-blue h-full">
            <div className="border border-olive-green mx-2 rounded-md shadow-md flex flex-col p-4 items-start w-full h-auto">
              <p>
                <b>Description:</b> {projectDetail.description}
              </p>
              <p>
                <b>Start Date: </b>
                {projectDetail.startDate && handleDate(projectDetail.startDate)}
              </p>
              <hr className="mt-8 py-2 text-olive-green w-3/5 mx-auto" />
              <div>
                <div className="flex-col justify-start">
                  <h3 className="font-bold text-xl">Scrum Master</h3>
                  <div className="flex flex-col gap-2 justify-start lg:flex-row  lg:items-center">
                    <div className="flex flex-items items-center gap-4">
                      {projectDetail.scrumMaster.profileImage ? (
                        <img
                          src={projectDetail.scrumMaster.profileImage}
                          alt="Profile Image"
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <FaUser />
                      )}
                      <p>
                        {projectDetail.scrumMaster.firstName}{" "}
                        {projectDetail.scrumMaster.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mt-8 py-2 text-olive-green w-3/5 mx-auto" />
              <div>
                <div className="flex-col justify-start">
                  <h3 className="font-bold text-xl my-2">Dev Team</h3>
                  {projectDetail.teamMembers ? (
                    <div>
                      {projectDetail.teamMembers.map((teammember) => (
                        <table>
                          <tbody>
                            <tr key={teammember._id}>
                              <td className=" flex flex-row items-center gap-2 ">
                                {teammember.profileImage ? (
                                  <img
                                    src={teammember.profileImage}
                                    alt="Profile Image"
                                    className="h-8 w-8 rounded-full"
                                  />
                                ) : (
                                  <FaUser />
                                )}
                                <p>
                                  {teammember.firstName} {teammember.lastName}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray">Not Assigned Yet!</p>
                  )}
                </div>
              </div>
            </div>
            {ProjectTasks && <TasksList ProjectTasks={ProjectTasks} />}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetail;
