import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, reset } from "../../features/Tasks/taskSlice";
import { getAllUsers } from "../../features/users/userSlice";
import TaskDetail from "./TaskDetail";
const TasksList = ({ ProjectTasks }) => {
  const dispatch = useDispatch();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const tasks = useSelector((state) => state.task);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const getUser = (assignee) => {
    const user = users.find((user) => user._id === assignee);
    return user && ( user.profileImage)
  };
  useEffect(() => {
    dispatch(getAllTasks());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const columns = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };

  ProjectTasks.forEach((task) => {
    columns[task.status].push(task);
  });

  return (
    <>
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
                className="border border-olive-green rounded-lg w-full p-2 flex flex-row justify-between items-start"
                key={task._id}
              >
                <button
                  className="hover:text-blue"
                  onClick={() => {
                    setSelectedTaskId(task._id);
                    setShowTaskModal(true);
                  }}
                >
                  <h2 className="font-bold ">{task.name}</h2>
                </button>
                <img
                  src={task.assignee && ( getUser(task.assignee))}
                  alt={`${task.name} image`}
                  className="h-6 w-6 rounded-full"
                />
                {showTaskModal && (
                  <TaskDetail
                  taskId={selectedTaskId}
                    onClose={() => setShowTaskModal(false)}
                  />
                )}
              </div>
            ))
          )}
        </div>
      ))}
    </>
  );
};

export default TasksList;
