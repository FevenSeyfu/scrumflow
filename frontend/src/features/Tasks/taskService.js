import axios from 'axios';

const API_URL = 'https://scrum-flow.onrender.com/api';
const TASK_URL = `${API_URL}/tasks/`;

const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(TASK_URL, taskData, config);
  return response.data;
};

const getAllTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(TASK_URL, config);
  return response.data;
};

const getTaskById = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${TASK_URL}${taskId}`, config);
  return response.data;
};

const updateTask = async (taskData, taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${TASK_URL}${taskId}`, taskData, config);
  return response.data;
};

const assignTask = async (taskData, taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${TASK_URL}${taskId}/assign`, taskData, config);
  return response.data;
};

const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${TASK_URL}${taskId}`, config);
  return response.data;
};

const taskService = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  assignTask,
  deleteTask,
};

export default taskService;
