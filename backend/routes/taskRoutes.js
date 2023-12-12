import express from 'express';
import {getAllTasks,getTaskById,createTask,updateTask,deleteTask} from '../controllers/taskController.js';
import {validateTask} from '../middlewares/validationMiddleware.js'
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.get('/',protect, getAllTasks);
router.get('/:id',protect, getTaskById);
router.post('/',protect,validateTask, createTask);
router.put('/:id',protect, updateTask);
router.delete('/:id',protect, deleteTask);

export default router;