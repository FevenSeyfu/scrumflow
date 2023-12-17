import React from 'react'
import UpdateUserProfile from './UpdateUserProfile'
import UserList from './UserList'
import Layout from '../common/Layout'

const AdminDashboard = () => {
  return (
    <Layout>
      admin
        <UpdateUserProfile />
        <UserList />
    </Layout>
  )
}

export default AdminDashboard