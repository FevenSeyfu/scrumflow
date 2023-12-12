import express from 'express';
import {getAllProjects,getProjectById,createProject,updateProject,deleteProject} from '../controllers/projectController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.get('/',protect, getAllProjects);
router.get('/:id',protect, getProjectById);
router.post('/', protect,createProject);
router.put('/:id',protect, updateProject);
router.delete('/:id',protect, deleteProject);

export default router;