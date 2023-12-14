import React from 'react'
import UpdateUserProfile from './UpdateUserProfile'
import UserList from './UserList'
import Layout from '../common/Layout'

const Dashboard = () => {
  return (
    <Layout>
        <UpdateUserProfile />
        <UserList />
    </Layout>
  )
}

export default Dashboard