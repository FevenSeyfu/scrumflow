import React from 'react'
import Layout from '../common/Layout'
import AssignTeamToTask from './task/AssignTeamToTask'
import CreateTask from './task/CreateTask'
import ProjectDetails from './project/ProjectDetail'
import SprintManagement from './SprintManagement'
import TaskManagement from './task/TaskManagement'
import ProjectList from './project/ProjectList'
const ScrumMasterDashboard = () => {
  return (
    <Layout>
        <ProjectList />
    </Layout>
  )
}

export default ScrumMasterDashboard