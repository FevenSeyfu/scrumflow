import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById, reset } from "../../features/Projects/projectSlice";
import { FaSpinner, FaUser } from "react-icons/fa";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

const ProjectDetail = ({ project_id, onClose }) => {
  const dispatch = useDispatch();

  const { projects, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.project
  );
  const projectDetail = projects.find((project) => project._id === project_id);

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
    <Modal
      isOpen={true}
      contentLabel="Project Details"
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="bg-white text-black p-8 mx-12 shadow-md shadow-dark-blue rounded-xl">
        <div className="flex justify-end">
          <MdClose size={30} onClick={onClose} />
        </div>
        {isLoading && <FaSpinner />}
        {isError && toast.error(message)}
        {isSuccess && (
          <div className="shadow-md shadow-olive-green rounded-md p-8">
            <h2 className="font-bold text-2xl text-center mb-8 whitespace-normal">
              {projectDetail.name}
            </h2>
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
                  <p>{projectDetail.scrumMaster.email}</p>
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
                          <tr key={teammember.id}>
                            <td className=" flex flex-row items-center gap-2 ">
                              <img
                                src={teammember.profileImage}
                                alt="Profile Image"
                                className="h-8 w-8 rounded-full"
                              />
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
    </Modal>
  );
};

export default ProjectDetail;
