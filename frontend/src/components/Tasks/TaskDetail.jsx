import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById, reset } from "../../features/Tasks/taskSlice";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { FaSpinner } from "react-icons/fa";
Modal.setAppElement("#root");

const TaskDetail = ({ taskId, onClose }) => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.task
  );
  const task = tasks.find((task) => task._id === taskId);
  const assignee = task.assignee;
  const { _id,username,profileImage} = assignee
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
      <div className=" text-white bg-dark-blue shadow-md shadow-dark-blue rounded-xl w-3/5">

        {isLoading && <FaSpinner />}
        {isError && toast.error(message)}
        {isSuccess && (
          <div className="flex flex-row w-auto">
            <div className="w-full bg-white text-black rounded-md px-4  p-12 ">
              <h3 className="font-bold ">{task.name.toUpperCase()}</h3>
              <p className="my-2 text-gray">{task.description}</p>
              <p><b>Deadline:</b>{task.deadline && (handleDate(task.deadline))}</p>
            </div>
            <div className="w-full text-white  h-full ">
              <div className="flex justify-end">
                <MdClose size={30} onClick={onClose} className="text-white" />
              </div>
              <div className="px-4  p-4 w-full">
                <div className="flex flex-col gap-2  items-center md:flex-row">
                  <b>Assignee </b>
                  <img src={profileImage} alt={`${username}`} className="w-8 h-8 rounded-full ml-2"/>
                </div>
                <div className="flex flex-row gap-4 mt-2">
                  <b>Status </b>
                  <p className="border border-olive-green rounded-md px-1 bg-olive-green bg-opacity-50 text-center">{task.status}</p>
                </div>
                {task.sprint &&(<div className="flex flex-row gap-4 mt-2">
                  <b>Sprint </b>
                  <p>{task.sprint.name}</p>
                </div>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TaskDetail;
