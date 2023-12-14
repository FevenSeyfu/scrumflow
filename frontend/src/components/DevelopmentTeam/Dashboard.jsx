import React from 'react'
import Layout from '../common/Layout'
import TaskDetails from './TaskDetails'
import UpdateTask from './UpdateTask'

const Dashboard = () => {
  return (
    <Layout>
      <TaskDetails />
      <UpdateTask />
    </Layout>
  )
}

export default Dashboard