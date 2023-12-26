import express from 'express';
import {registerUser,loginUser,getAllUsers,getUserById,updateUser,deleteUser} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import {validateRegisterUser,validateLogin,validateUpdateUser} from '../middlewares/validationMiddleware.js'
const router = express.Router();

router.post('/',validateRegisterUser,registerUser);
router.post('/login',validateLogin,loginUser);
router.get('/', protect,getAllUsers);
router.get('/:id',protect, getUserById);
router.put('/:id',protect,validateUpdateUser, updateUser);
router.delete('/:id',protect, deleteUser);

export default router;