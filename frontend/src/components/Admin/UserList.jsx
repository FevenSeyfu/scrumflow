import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, reset } from "../../features/users/userSlice";
import { FaSpinner, FaEdit, FaUserCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UpdateUser from './UpdateUser'
import DeleteUser from'./DeleteUser'

const UsersList = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { users, isLoading, isError, isSuccess } = useSelector(
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
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const [selectedRole, setSelectedRole] = useState("Development Team");
  const handleRole = (role) => {
    setSelectedRole(role);
  };
  const developmentTeamUsers = users.filter(
    (user) => user.role === "Development Team"
  );
  const projectOwnerUsers = users.filter(
    (user) => user.role === "Product Owner"
  );
  const scrumMasterUsers = users.filter((user) => user.role === "Scrum Master");
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

    if (isError) {
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
                        className="rounded-full w-12 h-12"
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
                    onClick={()=>{
                      setSelectedUserId(user._id)
                      setShowModal(true)}
                      }/>
                    <MdDeleteForever className="text-red" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            showModal && (
              <UpdateUser userId={selectedUserId} onClose={() => setShowModal(false)}/>
            )
          }
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Users List</h1>
      {renderUsers()}
    </div>
  );
};

export default UsersList;
