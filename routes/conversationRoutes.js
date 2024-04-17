import express from 'express';
import {
  startConversation,
  sendMessage,
  getConversationMessages,
} from '../controllers/conversationController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// @desc  Start New Conversation
router.route('/start-conversation').post(protect, startConversation);

// @desc  Send Message
router.route('/send-message').post(protect, sendMessage);

// @desc  Get all messages in a conversation
router
  .route('/:conversationId/messages/:role')
  .get(protect, getConversationMessages);

export default router;
