import asyncHandler from '../middleware/asyncHandler.js';
import Mentor from '../models/Mentor.js';
import generateToken from '../utils/generateToken.js';

// @desc    Assign Query
// @route   GET /query/assign
// @access  Private
const assignQuery = asyncHandler(async (req, res) => {
  const { batchNumber, query } = req.body;

  const getMentor = await Mentor.findOne({ batch: batchNumber });

  if (getMentor) {
    res.status(400);
    throw new Error('User already exists');
  }

  const mentor = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (mentor) {
    res.status(201).json({
      _id: mentor._id,
      firstName: mentor.firstName,
      lastName: mentor.lastName,
      email: mentor.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
