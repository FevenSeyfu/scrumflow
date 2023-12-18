import React, { useState } from "react";
import Layout from "../common/Layout";
import AddTask from "./AddTask";
import ProjectDetail from "./ProjectDetail";
import AssignTeam from "./AssignTeam";
import ProjectList from "./ProjectList";

const ProductOwnerDashboard = () => {
  
  return (
    <Layout>
      <ProjectList />
      <AddTask />
      <ProjectDetail />
      <AssignTeam />
    </Layout>
  );
};

export default ProductOwnerDashboard;
