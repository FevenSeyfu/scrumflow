import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const handleError = (error, thunkAPI) => {
  const message =
    (error.response && error.response.data && error.response.message) ||
    error.message ||
    error.toString();

  return thunkAPI.rejectWithValue(message);
};

export const createComment = createAsyncThunk(
  "project/createProject",
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.createProject(projectData, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const getAllProjects = createAsyncThunk(
    "project/createProject",
    async (projectData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await projectService.createProject(projectData, token);
      } catch (error) {
        return handleError(error, thunkAPI);
      }
    }
  );