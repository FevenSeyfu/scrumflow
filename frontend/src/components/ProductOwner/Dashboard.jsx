import React from 'react'
import Layout from '../common/Layout'
import AddTask from './AddTask'
import ProjectDetail from './ProjectDetail'
import AssignTeam from './AssignTeam'

const Dashboard = () => {
  return (
    <Layout>
        <AddTask />
        <ProjectDetail />
        <AssignTeam />
    </Layout>
  )
}

export default Dashboard