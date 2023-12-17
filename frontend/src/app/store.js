import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/Auth/authSlice'
import userReducer from '../features/users/userSlice'
import projectReducer from '../features/Projects/projectSlice'
import taskReducer from '../features/Tasks/taskSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        users:userReducer,
        project:projectReducer,
        task:taskReducer
    }
})
