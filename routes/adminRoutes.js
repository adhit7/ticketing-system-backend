import express from 'express';
import {
  loginAdmin,
  logoutAdmin,
  createLearner,
  createMentor,
  createBatch,
  getAllBatch,
  assignQuery,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// @desc  Login
router.route('/login').post(loginAdmin);

// @desc  Create Learner
router.route('/learner/create').post(protect, createLearner);

// @desc  Create Mentor
router.route('/mentor/create').post(protect, createMentor);

// @desc  Create Batch
router.route('/batch/create').post(protect, createBatch);

// @desc  All Batch
router.route('/batch/all').get(getAllBatch);

// @desc  Assign Query
router.route('/query/assign').put(protect, assignQuery);

// @desc  Login
router.route('/logout').post(logoutAdmin);

export default router;
