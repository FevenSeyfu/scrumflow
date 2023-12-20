import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjects,
  getProjectById,
  reset,
} from "../../../features/Projects/projectSlice";
import { FaSpinner, FaUser, FaArrowLeft } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
Modal.setAppElement("#root");

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  
  useEffect(() => {
    dispatch(getProjectById(project_id));
  }, [dispatch]);

  
  console.log(projects);
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
    <div className="bg-white text-black p-8 mx-12 shadow-md shadow-dark-blue rounded-xl w-80">
      <div className="flex justify-start">
        <FaArrowLeft size={30} onClick={onClose} />
        <h2 className="font-bold text-2xl text-center mb-8 whitespace-normal">
          {projectDetail.name}
        </h2>
      </div>
      {isLoading && <FaSpinner />}
      {isError && toast.error(message)}
      {isSuccess && (
        <div className="shadow-md shadow-olive-green rounded-md p-8">
          <p>
            <b>Description:</b> {projectDetail.description}
          </p>
          <p>
            <b>Start Date: </b>
            {projectDetail.startDate && handleDate(projectDetail.startDate)}
          </p>
          <hr className="my-4 text-olive-green" />
          <div>
            <div className="flex-col justify-start">
              <h3 className="font-bold text-xl  my-4">Scrum Master</h3>
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
          <hr className="my-4 text-olive-green" />
          <div>
            <div className="flex-col justify-start">
              <h3 className="font-bold text-xl my-4">Dev Team</h3>
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
      )}
    </div>
  );
};

export default ProjectDetail;
