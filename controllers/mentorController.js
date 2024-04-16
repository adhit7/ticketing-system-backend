import asyncHandler from '../middleware/asyncHandler.js';
import Mentor from '../models/Mentor.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import Query from '../models/Query.js';
import generateToken from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';
import { sendForgotPasswordMail } from '../utils/sendForgotPasswordMail.js';

// @desc    Login & get token
// @route   POST /mentor/login
// @access  Private
const loginMentor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const mentor = await Mentor.findOne({ email });

  if (mentor && (await mentor.matchPassword(password))) {
    generateToken(res, mentor._id);

    res.json({
      _id: mentor._id,
      firstName: mentor.firstName,
      lastName: mentor.lastName,
      email: mentor.email,
      role: 'mentor',
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    temporary password for user
// @route   POST /mentor/temp-token/:token
// @access  Private
const tempPassword = asyncHandler(async (req, res) => {
  const { tempToken } = req.body;
  const mentor = await Mentor.findOne({ tempToken });

  if (mentor) {
    res.json({
      message:
        'The generated password is valid, you can set your new password.',
    });
  } else {
    res.status(404);
    throw new Error(
      'Enter the entered temporary password is incorrect, try again'
    );
  }
});

// @desc    new password for user
// @route   PUT /mentor/new-password
// @access  Public
const newPassword = asyncHandler(async (req, res) => {
  const { tempToken, password } = req.body;

  const mentor = await Mentor.findOne({ tempToken });

  if (mentor) {
    mentor.tempToken = '';
    mentor.password = password;

    await mentor.save();

    generateToken(res, mentor._id);

    res.json({
      _id: mentor._id,
      name: mentor.name,
      email: mentor.email,
      role: 'mentor',
    });
  } else {
    res.status(404);
    throw new Error('Please go to forgot password page, try again');
  }
});

// @desc    new password for user
// @route   PUT /mentor/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const mentor = await Mentor.findOne({ email });

  if (mentor) {
    const name = `${mentor.firstName}  ${mentor.lastName}`;
    const email = mentor.email;
    const tempToken = uuidv4();

    mentor.tempToken = tempToken;

    await mentor.save();

    sendForgotPasswordMail(name, email, tempToken, 'mentor');

    res.json({
      message: 'Reset password link has been sent to your mail',
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

// @desc    Logout user and clear cookie
// @route   POST /mentor/logout
// @access  Private
const logoutMentor = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
});

const getAllQueries = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const mentor = await Mentor.findOne({ email });
  const queries = await Query.find({
    assignedTo: { $in: mentor?._id?.toString() },
  });

  if (mentor && queries) {
    res.status(200).json({
      queries,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const getQuery = asyncHandler(async (req, res) => {
  const { queryId } = req.params;

  const query = await Query.find({ _id: queryId });

  if (query) {
    res.status(200).json({
      query,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

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
  const { queryId, content } = req.body;

  const query = await Query.findById(queryId);

  const conversation = await Conversation.findOne({
    userId: query?.assignedTo?.toString(),
  });

  if (query && conversation) {
    const message = await Message.create({
      sender: query.assignedTo?.toString(),
      content: content,
      conversationId: conversation._id,
    });

    console.log('ss', conversation);
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

export {
  loginMentor,
  tempPassword,
  newPassword,
  forgotPassword,
  logoutMentor,
  getAllQueries,
  getQuery,
  startConversation,
  getConversationMessages,
  sendMessage,
};
