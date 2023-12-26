import React from 'react'
import UserList from './UserList'
import Layout from '../common/Layout'
import { ToastContainer } from 'react-toastify'

const AdminDashboard = () => {
  return (
    <Layout>
        <ToastContainer />
        <div>
          <UserList />
        </div>
    </Layout>
  )
}

export default AdminDashboard