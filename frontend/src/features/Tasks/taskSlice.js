import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
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

export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getAllTasks(token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTaskById(taskId, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ taskData, taskId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.updateTask(taskData, taskId, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const assignTask = createAsyncThunk(
  "task/assignTask",
  async ({ taskData, taskId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.assignTask(taskData, taskId, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.deleteTask(taskId, token);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
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
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTaskById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(assignTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const assignedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task._id === assignedTask._id ? assignedTask : task
        );
      })
      .addCase(assignTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedTaskId = action.payload;
        state.tasks = state.tasks.filter((task) => task._id !== deletedTaskId);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
