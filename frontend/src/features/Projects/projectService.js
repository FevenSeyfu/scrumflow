import axios from 'axios'

const API_URL = 'https://scrum-flow.onrender.com/api';
const project_URL = `${API_URL}/projects/`;

router.get('/',protect, getAllProjects);
router.get('/:id',protect, getProjectById);
router.put('/:id',protect, updateProject);
router.put('/:id/assign', protect, assignProject);
router.delete('/:id',protect, deleteProject);

const createProject = async (formData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(POSTS_URL,formData,config)
    return response.data
}
// router.get('/',protect, getAllProjects);
const getAllProjects = async (formData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(POSTS_URL,formData,config)
    return response.data
}
// router.get('/:id',protect, getProjectById);
const getProjectById = async (formData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(POSTS_URL,formData,config)
    return response.data
}
// router.put('/:id',protect, updateProject);
const updateProject = async (formData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(POSTS_URL,formData,config)
    return response.data
}
// router.put('/:id/assign', protect, assignProject);
const assignProject = async (formData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(POSTS_URL,formData,config)
    return response.data
}
// router.delete('/:id',protect, deleteProject);
const deleteProject = async (formData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(POSTS_URL,formData,config)
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