import express from 'express';
import { getAllQueries, getQuery } from '../controllers/queryController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// @desc  Get all queries
router.route('/query/all/:email/:role').get(protect, getAllQueries);

// @desc  Get single query
router.route('/query/:email/:queryId/:role').get(protect, getQuery);

export default router;
