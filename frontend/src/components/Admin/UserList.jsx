import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, reset } from '../../features/users/userSlice'; 
import { FaSpinner } from 'react-icons/fa';

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

  // Sort user by role and exlude admins from the list
  const sortUsersByName = (userList) => {
    const filteredUsers = userList.filter(user => user.role !== 'admin');
    return [...filteredUsers].sort((a, b) => a.username.localeCompare(b.username));
  };

  // Render function for displaying grouped and sorted users
  const renderUsers = () => {
    if (isLoading) {
      return <FaSpinner />
    }

    if (isError) {
      return <p>Error loading users.</p>;
    }

    if (isSuccess) {
      const sortedUsers = sortUsersByName(users);
      const groupedUsers = groupUsersByRole(sortedUsers);

      return (
        <div>
          {Object.keys(groupedUsers).map((role) => (
            <div key={role}>
              <h2>{role}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    {/* Add additional columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  {groupedUsers[role].map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      {/* Add additional cells as needed */}
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
      <h1>Users List</h1>
      {renderUsers()}
    </div>
  );
};

export default UsersList;
