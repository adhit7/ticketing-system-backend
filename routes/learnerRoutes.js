import express from 'express';
import {
  loginLearner,
  logoutLearner,
  tempPassword,
  newPassword,
  forgotPassword,
  createQuery,
  getAllQueries,
} from '../controllers/learnerController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// @desc  Login
router.route('/login').post(loginLearner);

// @desc  New Password
router.route('/temp-password').post(tempPassword);

// @desc  New Password
router.route('/new-password').put(newPassword);

// @desc  Forgot Password
router.route('/forgot-password').put(forgotPassword);

// @desc  Create new query
router.route('/query/create').post(protect, createQuery);

// @desc  Get all queries
router.route('/query/all/:email/:role').get(protect, getAllQueries);

// @desc  Logout
router.post('/logout', logoutLearner);

export default router;
