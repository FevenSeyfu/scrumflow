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

export const createProject = createAsyncThunk(
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
  "project/getAllProjects",
  async (projectownerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.getAllProjects(projectownerId, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const getProjectById = createAsyncThunk(
  "project/getProjectById",
  async (project_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.getProjectById(project_id, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ projectData, project_id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.updateProject(projectData, project_id, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const assignProject = createAsyncThunk(
  "project/assignProject",
  async ({ projectData, project_id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.assignProject(projectData, project_id, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (project_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.deleteProject(project_id, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllProjects.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updateProject = action.payload;
        state.projects = state.projects.map((project) =>
          project._id === updateProject._id ? updateProject : project
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //   assign to a project
      .addCase(assignProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updateProject = action.payload;
        state.projects = state.projects.map((project) =>
          project._id === updateProject._id ? updateProject : project
        );
      })
      .addCase(assignProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deleteProjectId = action.payload;
        state.projects = state.projects.filter(
          (project) => project._id !== deleteProjectId
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
