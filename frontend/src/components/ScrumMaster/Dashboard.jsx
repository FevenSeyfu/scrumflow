import React from 'react'
import Layout from '../common/Layout'
import AssignTeamToTask from './AssignTeamToTask'
import CreateTask from './CreateTask'
import ProjectDetails from './ProjectDetails'
import SprintManagement from './SprintManagement'
import TaskManagement from './TaskManagement'

const Dashboard = () => {
  return (
    <Layout>
        <AssignTeamToTask />
        <CreateTask />
        <ProjectDetails />
        <SprintManagement />
        <TaskManagement />
    </Layout>
  )
}

export default Dashboard