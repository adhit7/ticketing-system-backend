import express from 'express';
import {
  loginLearner,
  logoutLearner,
} from '../controllers/learnerController.js';

const router = express.Router();

// @desc  Login
router.route('/login').post(loginLearner);

// @desc  Logout
router.post('/logout', logoutLearner);

export default router;
