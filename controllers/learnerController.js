import asyncHandler from '../middleware/asyncHandler.js';
import Learner from '../models/Learner.js';
import generateToken from '../utils/generateToken.js';

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
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Logout user and clear cookie
// @route   POST /learner/logout
// @access  Private
const logoutLearner = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
});

const getAllQueries = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
});

export { loginLearner, logoutLearner };
