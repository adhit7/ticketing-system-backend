import asyncHandler from '../middleware/asyncHandler.js';
import Query from '../models/Query.js';
import { roles } from '../utils/roles.js';

const getAllQueries = asyncHandler(async (req, res) => {
  const { email, role } = req.params;

  const user = await roles[role]?.findOne({ email });

  let queries;

  if (role === 'admin') {
    queries = await Query.find({});
  } else if (role === 'mentor') {
    queries = await Query.find({
      assignedTo: { $in: user?._id?.toString() },
    });
  } else if (role === 'learner') {
    queries = await Query.find({
      raisedBy: { $in: user?._id?.toString() },
    });
  }

  if (user && queries) {
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

  const query = await Query.findOne({ _id: queryId });

  if (query) {
    res.status(200).json({
      query,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

const closeQuery = asyncHandler(async (req, res) => {
  const { queryId, solution } = req.body;

  const query = await Query.findOne({ _id: queryId });

  // if (query?.status === 'CLOSED') {
  //   res.status(400);
  //   throw new Error('This query is already closed, please refresh the page');
  // }

  if (query) {
    query.solution = solution;
    query.status = 'CLOSED';
    query.save();

    res.status(200).json({
      query,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

export { getAllQueries, getQuery, closeQuery };
