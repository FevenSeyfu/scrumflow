import React from 'react'
import Layout from '../common/Layout'
import AssignTeamToTask from './AssignTeamToTask'
import CreateTask from './CreateTask'
import ProjectDetails from './ProjectDetails'
import SprintManagement from './SprintManagement'
import TaskManagement from './TaskManagement'

const ScrumMasterDashboard = () => {
  return (
    <Layout>
      scrum master
        <AssignTeamToTask />
        <CreateTask />
        <ProjectDetails />
        <SprintManagement />
        <TaskManagement />
    </Layout>
  )
}

export default ScrumMasterDashboard