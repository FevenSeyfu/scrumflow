import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
// auth pages
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import UserProfile from "./pages/Auth/UserProfile";
// Dashbords
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProductOwnerDashboard from "./components/ProductOwner/ProductOwnerDashboard";
import ScrumMasterDashboard from "./components/ScrumMaster/ScrumMasterDashboard";
import DevelopmentTeamDashboard from "./components/DevelopmentTeam/DevelopmentTeamDashboard";

// project
import ProjectDetailDev from './components/DevelopmentTeam/ProjectDetailDev'
import ProjectDetail from "./components/ScrumMaster/project/ProjectDetail"

const App = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />

        {/* for user registration */}
        <Route path="/users/" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/profile" element={<UserProfile />} />
        
        {/* Route to dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <>
                {user.role === "admin" && <AdminDashboard user={user} />}
                {user.role === "Product Owner" && <ProductOwnerDashboard user={user} />}
                {user.role === "Scrum Master" && <ScrumMasterDashboard user={user} />}
                {user.role === "Development Team" && <DevelopmentTeamDashboard user={user} />}
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/dashboard/project/:id" 
            element={user ? (
              <>
                {user.role === "Scrum Master" && <ProjectDetail  />}
                {user.role === "Development Team" && <ProjectDetailDev  />}
              </>
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Routes>
      <ToastContainer/>
    </>
  );
};

export default App;
