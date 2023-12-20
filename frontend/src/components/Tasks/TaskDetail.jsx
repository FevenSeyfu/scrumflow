// TaskDetail.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById, reset } from '../../features/Tasks/taskSlice';

const TaskDetail = ({ taskId }) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTaskById(taskId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, taskId]);

  return (
    <div>
      <h2>Task Detail</h2>
    </div>
  );
};

export default TaskDetail;
