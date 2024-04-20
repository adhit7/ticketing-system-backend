import asyncHandler from '../middleware/asyncHandler.js';
import Learner from '../models/Learner.js';
import Query from '../models/Query.js';
import generateToken from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';
import { sendForgotPasswordMail } from '../utils/sendForgotPasswordMail.js';

// @desc    Login & get token
// @route   POST /learner/login
// @access  Public
const loginLearner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const learner = await Learner.findOne({ email });

  if (learner && (await learner.matchPassword(password))) {
    generateToken(res, learner._id);

    res.json({
      _id: learner._id,
      firstName: learner.firstName,
      lastName: learner.lastName,
      email: learner.email,
      role: 'learner',
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user and clear cookie
// @route   POST /learner/logout
// @access  Private
const logoutLearner = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    temporary password for user
// @route   POST /learner/temp-token/:token
// @access  Private
const tempPassword = asyncHandler(async (req, res) => {
  const { tempToken } = req.body;
  const learner = await Learner.findOne({ tempToken });

  if (learner) {
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
// @route   PUT /learner/new-password
// @access  Public
const newPassword = asyncHandler(async (req, res) => {
  const { tempToken, password } = req.body;

  const learner = await Learner.findOne({ tempToken });

  if (learner) {
    learner.tempToken = '';
    learner.password = password;

    await learner.save();

    generateToken(res, learner._id);

    res.json({
      _id: learner._id,
      name: learner.name,
      email: learner.email,
      role: 'learner',
    });
  } else {
    res.status(404);
    throw new Error('Please go to forgot password page, try again');
  }
});

// @desc    new password for user
// @route   PUT /learner/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const learner = await Learner.findOne({ email });

  if (learner) {
    const name = `${learner.firstName}  ${learner.lastName}`;
    const email = learner.email;
    const tempToken = uuidv4();

    learner.tempToken = tempToken;

    await learner.save();

    sendForgotPasswordMail(name, email, tempToken, 'learner');

    res.json({
      message: 'Reset password link has been sent to your mail',
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

// @desc    Create Query
// @route   POST /query/create
// @access  Public
const createQuery = asyncHandler(async (req, res) => {
  const { queryValues } = req.body;

  const learnerId = req.user._id?.toString();
  const learner = await Learner.findById(learnerId);

  const query = await Query.create({
    ...queryValues,
    raisedBy: learnerId,
  });

  if (query && learner) {
    //Adding query id to the learner document
    learner.query.push(query?._id?.toString());
    await learner.save();

    res.status(201).json({
      message: 'Your Query has been created',
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

export {
  loginLearner,
  logoutLearner,
  newPassword,
  forgotPassword,
  tempPassword,
  createQuery,
};
