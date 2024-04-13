import express from 'express';
import {
  loginMentor,
  logoutMentor,
  newPassword,
  forgotPassword,
  tempPassword,
} from '../controllers/mentorController.js';

const router = express.Router();

// @desc  Login
router.route('/login').post(loginMentor);

// @desc  New Password
router.route('/temp-password').post(tempPassword);

// @desc  New Password
router.route('/new-password').put(newPassword);

// @desc  Forgot Password
router.route('/forgot-password').put(forgotPassword);

// @desc  Logout
router.post('/logout', logoutMentor);

export default router;
