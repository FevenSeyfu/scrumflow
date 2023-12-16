import React from 'react'
import Layout from '../common/Layout'
import AddTask from './AddTask'
import ProjectDetail from './ProjectDetail'
import AssignTeam from './AssignTeam'
import CreateProject from './CreateProject'

const ProductOwnerDashboard = () => {
  return (
    <Layout>
        <CreateProject />
        <AddTask />
        <ProjectDetail />
        <AssignTeam />
    </Layout>
  )
}

export default ProductOwnerDashboard