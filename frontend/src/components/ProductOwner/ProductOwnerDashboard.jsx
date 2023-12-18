import React, { useState } from "react";
import Layout from "../common/Layout";
import AddTask from "./AddTask";
import ProjectDetail from "./ProjectDetail";
import AssignTeam from "./AssignTeam";
import CreateProject from "./CreateProject";

const ProductOwnerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Layout>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        + Add Project
      </button>
      {showModal && (
        <CreateProject onClose={() => setShowModal(false)} />
      )}
      <AddTask />
      <ProjectDetail />
      <AssignTeam />
    </Layout>
  );
};

export default ProductOwnerDashboard;
