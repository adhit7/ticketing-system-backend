import asyncHandler from '../middleware/asyncHandler.js';
import Mentor from '../models/Mentor.js';
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
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    temporary password for user
// @route   GET /mentor/temp-token/:token
// @access  Private
const tempPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const mentor = await Mentor.findOne({ tempToken: token });

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
    mentor.tempPassword = '';
    mentor.password = password;

    await mentor.save();

    generateToken(res, mentor._id);

    res.json({
      _id: mentor._id,
      name: mentor.name,
      email: mentor.email,
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

    await user.save();

    sendForgotPasswordMail(name, email, tempToken);

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

export { loginMentor, tempPassword, newPassword, forgotPassword, logoutMentor };
