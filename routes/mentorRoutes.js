import express from 'express';
import { loginMentor, logoutMentor } from '../controllers/mentorController.js';

const router = express.Router();

// @desc  Login
router.route('/login').post(loginMentor);

// @desc  Logout
router.post('/logout', logoutMentor);

export default router;
