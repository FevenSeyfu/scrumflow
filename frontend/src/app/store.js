import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/Auth/authSlice";
import userReducer from "../features/users/userSlice";
import projectReducer from "../features/Projects/projectSlice";
import taskReducer from "../features/Tasks/taskSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  project: projectReducer,
  task: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
