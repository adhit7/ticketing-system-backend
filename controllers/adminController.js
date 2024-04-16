import asyncHandler from '../middleware/asyncHandler.js';
import Admin from '../models/Admin.js';
import Mentor from '../models/Mentor.js';
import Learner from '../models/Learner.js';
import Batch from '../models/Batch.js';
import Query from '../models/Query.js';
import generateToken from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';
import { sendCredentialMail } from '../utils/sendCredentialMail.js';

const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login & get token
// @route   POST /admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id);

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user and clear cookie
// @route   POST /admin/logout
// @access  Private
const logoutAdmin = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Create Learner
// @route   POST /admin/learner/create
// @access  Private
const createLearner = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, batchName } = req.body;

  const learnerExists = await Learner.findOne({ email });

  if (learnerExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const batch = await Batch.findOne({ courseName: batchName });

  if (!batch) {
    res.status(400);
    throw new Error('Please give correct batch name');
  }

  const tempToken = uuidv4();

  const learner = await Learner.create({
    firstName,
    lastName,
    email,
    batch: batchName,
    tempToken,
  });

  if (learner) {
    batch.students.push(learner.email);

    await batch.save();

    const name = `${learner.firstName}  ${learner.lastName}`;

    sendCredentialMail(name, email, tempToken, 'learner');

    res.status(201).json({
      _id: learner._id,
      firstName: learner.firstName,
      lastName: learner.lastName,
      email: learner.email,
      message: 'Learner has created successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Create Mentor
// @route   POST /admin/mentor/create
// @access  Private
const createMentor = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, batches } = req.body;

  const mentorExists = await Mentor.findOne({ email });
  if (mentorExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const batch = await Batch.find({ courseName: batches });

  if (!batch) {
    res.status(400);
    throw new Error('Please give correct batch name');
  }

  const tempToken = uuidv4();

  const mentor = await Mentor.create({
    firstName,
    lastName,
    email,
    tempToken,
  });

  if (mentor) {
    //Updating Mentor email id in Batch data
    const updateOps = batch.map((record) => {
      const updateOp = {
        updateOne: {
          filter: {
            courseName: record.courseName,
          },
          update: {
            mentor: mentor.email,
          },
        },
      };
      return updateOp;
    });

    await Batch.bulkWrite(updateOps);

    mentor.batch = mentor.batch.concat(batches);

    await mentor.save();

    const name = `${mentor.firstName}  ${mentor.lastName}`;

    sendCredentialMail(name, email, tempToken, 'mentor');

    res.status(201).json({
      _id: mentor._id,
      firstName: mentor.firstName,
      lastName: mentor.lastName,
      email: mentor.email,
      message: 'Mentor has created successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Create Batch
// @route   POST /admin/batch/create
// @access  Private
const createBatch = asyncHandler(async (req, res) => {
  const { courseName } = req.body;

  const batchExists = await Batch.findOne({ courseName });

  if (batchExists) {
    res.status(400);
    throw new Error(
      'Course name already exists, please give uniques name to it'
    );
  }

  const batch = await Batch.create({
    courseName,
  });

  if (batch) {
    res.status(201).json({
      courseName: courseName,
      message: `${courseName} batch has created successfully`,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const getAllBatch = asyncHandler(async (req, res) => {
  const batches = await Batch.find({});
  if (batches) {
    res.status(200).json({
      batches,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const getAllQueries = asyncHandler(async (req, res) => {
  const queries = await Query.find({});
  if (queries) {
    res.status(200).json({
      queries,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const assignQuery = asyncHandler(async (req, res) => {
  const { queryId } = req.body;

  const query = await Query.findById(queryId);
  const learner = await Learner.findById(query?.raisedBy);

  const mentor = await Mentor.findOne({ batch: learner?.batch });

  if (learner && mentor && query) {
    query.assignedTo = mentor._id;
    query.assignedMentorName = `${mentor.firstName} ${mentor.lastName}`;
    query.status = 'ASSIGNED';
    await query.save();

    mentor.query.push(query._id?.toString());
    await learner.save();

    res.status(200).json({
      message: 'The query is assigned to that batch mentor successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

export {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  createLearner,
  createMentor,
  createBatch,
  getAllBatch,
  getAllQueries,
  assignQuery,
};
