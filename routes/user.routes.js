import express from 'express';
import { loginUser, deleteUser, updateUser, getUserById, createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login',)

router.post('/register', createUser);
router.post("/login", loginUser);
router.get("/", getUserById);
router.put("/", updateUser);
router.delete("/", deleteUser);


export default router;