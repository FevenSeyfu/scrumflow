import express from 'express';
import {getAllSprints,getSprintById,createSprint,updateSprint,deleteSprint} from '../controllers/sprintController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.get('/',protect, getAllSprints);
router.get('/:id',protect, getSprintById);
router.post('/',protect, createSprint);
router.put('/:id',protect, updateSprint);
router.delete('/:id',protect, deleteSprint);

export default router;