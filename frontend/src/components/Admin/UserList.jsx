import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, reset } from '../../features/users/userSlice'; 
import { FaSpinner, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const UsersList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, isSuccess } = useSelector((state) => state.users);

  useEffect(() => {
    // Dispatch action to get all users
    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Function to group users by their role
  const groupUsersByRole = (userList) => {
    const groupedUsers = {};
    userList.forEach((user) => {
      const { role } = user;
      if (!groupedUsers[role]) {
        groupedUsers[role] = [];
      }
      groupedUsers[role].push(user);
    });
    return groupedUsers;
  };

  // handle date formatting
  const handleDate = (dateInput) => {
    const date = new Date(dateInput);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };
  // Sort user by role and exlude admins from the list
  const sortUsersByName = (userList) => {
    const filteredUsers = userList.filter(user => user.role !== 'admin');
    return [...filteredUsers].sort((a, b) => a.username.localeCompare(b.username));
  };

  // displaying grouped and sorted users
  const renderUsers = () => {
    if (isLoading) {
      return <FaSpinner />;
    }

    if (isError) {
      return <p>Error loading users.</p>;
    }

    if (isSuccess) {
      const sortedUsers = sortUsersByName(users);
      const groupedUsers = groupUsersByRole(sortedUsers);

      return (
        <div>
          {Object.keys(groupedUsers).map((role, index) => (
            <div key={role} className="mb-8">
              <h2 className="text-2xl mb-2">
                <Link to={`/usersList/${role}`} className="flex items-center">
                  <span className="mr-2">{index + 1}.</span>
                  {role}
                </Link>
              </h2>
              <table className="table-auto border border-collapse border-olive-green">
                <thead>
                  <tr className="bg-olive-green text-white">
                    <th className="border border-olive-green py-2 px-4">No</th>
                    <th className="border border-olive-green py-2 px-4">Name</th>
                    <th className="border border-olive-green py-2 px-4">Username</th>
                    <th className="border border-olive-green py-2 px-4">Email</th>
                    <th className="border border-olive-green py-2 px-4">Date of Registration</th>
                    <th className="border border-olive-green py-2 px-4">Last Update</th>
                    <th className="border border-olive-green py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedUsers[role].map((user, userIndex) => (
                    <tr key={user._id} className={userIndex % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="border border-olive-green py-2 px-4">{userIndex + 1}</td>
                      <td className="border border-olive-green py-2 px-4">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="border border-olive-green py-2 px-4">{user.username}</td>
                      <td className="border border-olive-green py-2 px-4">{user.email}</td>
                      <td className="border border-olive-green py-2 px-4">
                        {user.createdAt && handleDate(user.createdAt)}
                      </td>
                      <td className="border border-olive-green py-2 px-4">
                        {user.updatedAt && handleDate(user.updatedAt)}
                      </td>
                      <td className="border border-olive-green py-2 px-4">
                        <Link to={`/updateUserProfile/${user._id}`}>
                          <FaEdit />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
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