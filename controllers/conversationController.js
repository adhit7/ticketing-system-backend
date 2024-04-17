import asyncHandler from '../middleware/asyncHandler.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import Query from '../models/Query.js';

const startConversation = asyncHandler(async (req, res) => {
  const { queryId, content } = req.body;

  const query = await Query.findById(queryId);

  if (query?.conversationId) {
    res.status(400);
    throw new Error('You have already created a conversation on this query');
  }

  const conversation = await Conversation.create({
    userId: query?.assignedTo?.toString(),
  });

  if (query && conversation) {
    const message = await Message.create({
      sender: query?.assignedTo?.toString(),
      content: content,
      conversationId: conversation._id,
    });
    if (message) {
      conversation.messages.push({ messageId: message._id });

      await conversation.save();

      query.conversationId = conversation._id;

      await query.save();

      res.status(201).json({
        message: content,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data for sending new message');
    }
  } else {
    res.status(400);
    throw new Error('Invalid user data for starting new conversation');
  }
});

const getConversationMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  // Find the conversation and populate the messages and participants fields
  const conversation = await Conversation.findById(conversationId)
    .populate({
      path: 'messages.messageId',
      model: 'Message',
      select: 'content sender createdAt',
    })
    .exec();

  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }
  // Extract the relevant message data
  const messages = conversation.messages.map((message) => ({
    _id: message.messageId._id,
    content: message.messageId.content,
    sender: message.messageId.sender,
    createdAt: message.messageId.createdAt,
  }));

  if (messages) {
    res.status(200).json({
      messages,
    });
  } else {
    res.status(500).json({ message: 'Server error' });
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { queryId, content, role } = req.body;

  const query = await Query.findById(queryId);

  const conversation = await Conversation.findOne({
    userId: query?.assignedTo?.toString(),
  });

  if (query && conversation) {
    const user = role === 'mentor' ? query.assignedTo : query.raisedBy;

    const message = await Message.create({
      sender: user?.toString(),
      content: content,
      conversationId: conversation._id,
    });

    if (message) {
      conversation.messages.push({ messageId: message._id });
      await conversation.save();

      res.status(201).json({
        message: content,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data for sending new message');
    }
  } else {
    res.status(400);
    throw new Error('Invalid user data for getting conversation');
  }
});

export { startConversation, sendMessage, getConversationMessages };
