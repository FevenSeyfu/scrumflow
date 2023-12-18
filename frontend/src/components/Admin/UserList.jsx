import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, reset } from "../../features/users/userSlice";
import { FaSpinner, FaEdit, FaUserCircle,FaTrash } from "react-icons/fa";
import UpdateUser from './UpdateUser'
import DeleteUser from'./DeleteUser'
import { toast } from "react-toastify";

const UsersList = () => {
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { users, isLoading, isError, isSuccess,message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    // Dispatch action to get all users
    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // handle date formatting
  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

  const [selectedRole, setSelectedRole] = useState("Development Team");
  const handleRole = (role) => {
    setSelectedRole(role);
  };
  const developmentTeamUsers = Array.isArray(users)
  ? users.filter((user) => user.role === "Development Team")
  : [];
  const projectOwnerUsers = Array.isArray(users)
  ? users.filter((user) => user.role === "Product Owner")
  : [];
  const scrumMasterUsers = Array.isArray(users)
  ? users.filter((user) => user.role === "Scrum Master")
  : [];
  // displaying grouped and sorted users
  const renderUsers = () => {
    let filteredUsers = [];
    switch (selectedRole) {
      case "Development Team":
        filteredUsers = developmentTeamUsers;
        break;
      case "Product Owner":
        filteredUsers = projectOwnerUsers;
        break;
      case "Scrum Master":
        filteredUsers = scrumMasterUsers;
        break;
      default:
        filteredUsers = users;
        break;
    }
    // Sort users alphabetically by username
    filteredUsers.sort((a, b) => a.username.localeCompare(b.username));

    if (isLoading) {
      return <FaSpinner />;
    }

    if (isError && message) {
      return toast.error(message);
    }

    if (isSuccess) {
      return (
        <div className="flex flex-col mx-16 gap-2">
          <div className="flex flex-row">
            <button
              onClick={() => handleRole("Development Team")}
              className="-none text-blue bg-white hover:text-dark-blue hover:underline"
            >
              Development Team
            </button>
            /
            <button
              onClick={() => handleRole("Scrum Master")}
              className="-none text-blue bg-white hover:text-dark-blue hover:underline"
            >
              Scrum Master
            </button>
            /
            <button
              onClick={() => handleRole("Product Owner")}
              className="-none text-blue bg-white hover:text-dark-blue hover:underline"
            >
              Product Owner
            </button>
          </div>

          <table className="table-auto ">
            <thead>
              <tr className="bg-olive-green text-white">
                <th className="text-left p-2 border border-light-gray">No.</th>
                <th className="text-left p-2 border border-light-gray">Name</th>
                <th className="text-left p-2 border border-light-gray">
                  Username
                </th>
                <th className="text-left p-2 border border-light-gray">
                  Email
                </th>
                <th className="text-left p-2 border border-light-gray">
                  Signup Date
                </th>
                <th className="text-left p-2 border border-light-gray">
                  Last Update
                </th>
                <th className="text-left p-2 border border-light-gray">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, userIndex) => (
                <tr key={user._id} className="shadow-md my-4 rounded-2xl">
                  <td className=" p-2 ">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="profile picture"
                        className="rounded-full w-8 h-8"
                      />
                    ) : (
                      <FaUserCircle size={24} className="text-dark-blue" />
                    )}
                  </td>
                  <td className=" p-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className=" p-2">{user.username}</td>
                  <td className=" p-2">{user.email}</td>
                  <td className=" p-2">
                    {user.createdAt && handleDate(user.createdAt)}
                  </td>
                  <td className=" p-2">
                    {user.updatedAt && handleDate(user.updatedAt)}
                  </td>
                  <td className=" p-2 flex flex-row justify-between">
                  <FaEdit
                    className="text-green"
                    onClick={() => {
                      setSelectedUserId(user._id);
                      setShowUpdateModal(true);
                      setShowDeleteModal(false); 
                    }}
                  />
                  <FaTrash
                    className="text-red"
                    onClick={() => {
                      setSelectedUserId(user._id);
                      setShowDeleteModal(true);
                      setShowUpdateModal(false); 
                    }}
                  />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Users List</h1>
      {showUpdateModal && (
        <UpdateUser userId={selectedUserId} onClose={() => setShowUpdateModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteUser userId={selectedUserId} onClose={() => setShowDeleteModal(false)} />
      )}
      {renderUsers()}
      
    </div>
  );
};

export default UsersList;
