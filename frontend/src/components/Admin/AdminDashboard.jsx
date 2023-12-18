import React from 'react'
import UpdateUserProfile from './UpdateUserProfile'
import UserList from './UserList'
import Layout from '../common/Layout'

const AdminDashboard = () => {
  return (
    <Layout>
        <div>
          <UpdateUserProfile />
          <UserList />
        </div>
    </Layout>
  )
}

export default AdminDashboard