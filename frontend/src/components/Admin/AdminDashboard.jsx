import React from 'react'
import UserList from './UserList'
import Layout from '../common/Layout'

const AdminDashboard = () => {
  return (
    <Layout>
        <div>
          <UserList />
        </div>
    </Layout>
  )
}

export default AdminDashboard