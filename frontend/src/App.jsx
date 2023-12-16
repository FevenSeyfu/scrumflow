import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
// auth pages
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import UserProfile from "./pages/Auth/UserProfile";
// Dashbords
import Dashboard from './components/Admin/AdminDashboard'
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

        <Route path="/admin">
          {user && user.role === "admin" ? (
            <AdminDashboard user={user} />
          ) : (
            <Navigate to="/" />
          )}
        </Route>
        <Route path="/product-owner">
          {user && user.role === "Product Owner" ? (
            <ProductOwnerDashboard user={user} />
          ) : (
            <Navigate to="/" />
          )}
        </Route>
        <Route path="/scrum-master">
          {user && user.role === "Scrum Master" ? (
            <ScrumMasterDashboard user={user} />
          ) : (
            <Navigate to="/" />
          )}
        </Route>
        <Route path="/development-team">
          {user && user.role === "Development Team" ? (
            <DevelopmentTeamDashboard user={user} />
          ) : (
            <Navigate to="/" />
          )}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
