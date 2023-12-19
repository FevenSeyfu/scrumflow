import axios from 'axios'

const API_URL = 'https://scrum-flow.onrender.com/api';
const PROJECT_URL = `${API_URL}/projects/`;

const createProject = async (projectData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(PROJECT_URL,projectData,config)
    return response.data
}
// router.get('/',protect, getAllProjects);
const getAllProjects = async (projectownerId,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(`${PROJECT_URL}/myproject/${projectownerId}`,config);
    return response.data
}
// router.get('/:id',protect, getProjectById);
const getProjectById = async (project_id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(`${PROJECT_URL}${project_id}`, config);
    return response.data
}
// router.put('/:id',protect, updateProject);
const updateProject = async (projectData,project_id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(`${PROJECT_URL}${project_id}`,projectData,config)
    return response.data
}
// router.put('/:id/assign', protect, assignProject);
const assignProject = async (projectData,project_id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(`${PROJECT_URL}${project_id}/assign`, projectData, config);
    return response.data
}
// router.delete('/:id',protect, deleteProject);
const deleteProject = async (project_id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(`${PROJECT_URL}${project_id}`, config);
    return response.data
}

const projectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    assignProject,
    deleteProject
}

export default projectService;