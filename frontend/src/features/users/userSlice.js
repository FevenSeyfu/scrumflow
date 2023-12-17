import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async (_, thunkAPI) => {
        try {
            return await userService.getAllUsers();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getUserById = createAsyncThunk(
    "users/getUserById",
    async (userId, thunkAPI) => {
        try {
            return await userService.getUserById(userId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (userData, thunkAPI) => {
        try {
            const { userId, updatedData } = userData;
            const token = thunkAPI.getState().auth.user.token;
            return await userService.updateUser(userId, updatedData, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue({ message });
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await userService.deleteUser(userId, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
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
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = state.users.filter(
                    (user) => user._id !== action.payload.id
                );
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
