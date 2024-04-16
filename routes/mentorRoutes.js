import express from 'express';
import {
  loginMentor,
  logoutMentor,
  newPassword,
  forgotPassword,
  tempPassword,
  getAllQueries,
  getQuery,
  getConversationMessages,
  startConversation,
  sendMessage,
} from '../controllers/mentorController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// @desc  Login
router.route('/login').post(loginMentor);

// @desc  New Password
router.route('/temp-password').post(tempPassword);

// @desc  New Password
router.route('/new-password').put(newPassword);

// @desc  Forgot Password
router.route('/forgot-password').put(forgotPassword);

// @desc  Get all queries
router.route('/query/all/:email/:role').get(protect, getAllQueries);

// @desc  Get single query
router.route('/query/:email/:queryId/:role').get(protect, getQuery);

// @desc  Start New Conversation
router.route('/start-conversation').post(protect, startConversation);

// @desc  Send Message
router.route('/send-message').post(protect, sendMessage);

// @desc  Get all messages in a conversation
router
  .route('/:conversationId/messages/:role')
  .get(protect, getConversationMessages);

// @desc  Logout
router.post('/logout', logoutMentor);

export default router;
