import express from 'express';
import {
  loginLearner,
  logoutLearner,
  tempPassword,
  newPassword,
  forgotPassword,
} from '../controllers/learnerController.js';

const router = express.Router();

// @desc  Login
router.route('/login').post(loginLearner);

// @desc  New Password
router.route('/temp-password').post(tempPassword);

// @desc  New Password
router.route('/new-password').put(newPassword);

// @desc  Forgot Password
router.route('/forgot-password').put(forgotPassword);

// @desc  Logout
router.post('/logout', logoutLearner);

export default router;
