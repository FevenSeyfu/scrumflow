import express from 'express';
import {getAllProjects,getProjectById,createProject,updateProject,deleteProject} from '../controllers/projectController.js';
import {validateProject} from '../middlewares/validationMiddleware.js'
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.get('/',protect, getAllProjects);
router.get('/:id',protect, getProjectById);
router.post('/', protect,validateProject,createProject);
router.put('/:id',protect, updateProject);
router.delete('/:id',protect, deleteProject);

export default router;