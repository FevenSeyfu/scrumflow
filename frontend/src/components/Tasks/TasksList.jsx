import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, reset } from "../../features/Projects/projectSlice";
import { getAllUsers } from "../../features/users/userSlice";
import TaskDetail from "./TaskDetail";
import CreateTask from "./CreateTask";
import { FaTrash } from "react-icons/fa";
import DeleteTask from "./DeleteTask";

const TasksList = ({ ProjectId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task);
  const { users } = useSelector((state) => state.users);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const getUser = (assignee) => {
    const user = users.find((user) => user._id === assignee);
    return user && user.profileImage;
  };
  useEffect(() => {
    dispatch(getAllProjects());
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
  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference <= 3;
  };
  const columns = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };
  const { projects } = useSelector((state) => state.project);
  const projectDetail = projects.find((project) => project._id === ProjectId);
  const ProjectTasks = projectDetail.tasks;
  ProjectTasks.forEach((task) => {
    columns[task.status].push(task);
  });

  return (
    <>
      {showCreateTaskModal && (
        <CreateTask onClose={() => setShowCreateTaskModal(false)} />
      )}
      {Object.entries(columns).map(([status, tasks]) => (
        <div
          key={status}
          className="shadow-lg shadow-olive-green mx-2 rounded-md p-2 flex flex-col gap-2 items-start w-full h-full"
        >
          <h2>{status}</h2>
          {tasks.length === 0 ? (
            <p>No Task Yet!</p>
          ) : (
            tasks.map((task) => (
              <div
                className="border border-olive-green rounded-lg w-full p-2 flex flex-col justify-between items-start"
                key={task._id}
              >
                <div className="flex flex-row justify-evenly">
                  <img
                    src={task.assignee && getUser(task.assignee)}
                    alt={`${task.name} image`}
                    className="h-6 w-6 rounded-full"
                  />
                  <button
                    className="hover:text-blue"
                    onClick={() => {
                      setSelectedTaskId(task._id);
                      setShowTaskModal(true);
                    }}
                  >
                    <h2 className="font-bold text-left ">
                      {task.name.toUpperCase()}
                    </h2>
                  </button>
                  <FaTrash
                    className="text-red"
                    onClick={() => {
                      setSelectedTaskId(task._id);
                      setShowDeleteTaskModal(true);
                    }}
                  />
                </div>

                <div className="flex flex-row justify-end">
                  <p
                    className={`text-right text-sm ${
                      isDeadlineNear(task.deadline) ? "text-red" : "text-gray"
                    }`}
                  >
                    {task.deadline && handleDate(task.deadline)}
                  </p>
                </div>

                {showTaskModal && (
                  <TaskDetail
                    taskId={selectedTaskId}
                    onClose={() => setShowTaskModal(false)}
                  />
                )}
                {showDeleteTaskModal && (
                  <DeleteTask
                    taskId={selectedTaskId}
                    onClose={() => setShowDeleteTaskModal(false)}
                  />
                )}
              </div>
            ))
          )}
          {status === "To Do" && (
            <button
              onClick={() => {
                setShowCreateTaskModal(true);
              }}
              className="text-left text-blue bg-white hover:text-dark-blue hover:underline cursor-pointer"
            >
              + Add Task
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default TasksList;
