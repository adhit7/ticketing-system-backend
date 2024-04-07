import express from 'express';
import {
  createLearner,
  createMentor,
  createBatch,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// @desc  Create Learner
router.route('/learner/create').post(protect, createLearner);

// @desc  Create Mentor
router.route('/mentor/create').post(protect, createMentor);

// @desc  Create Batch
router.route('/batch/create').post(protect, createBatch);

export default router;
