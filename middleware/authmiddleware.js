import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import { roles } from '../utils/roles.js';

const protect = asyncHandler(async (req, res, next) => {
  let token, role;

  // Get JWT from the cookie
  token = req.cookies.jwt;
  role = roles[req.body.role];

  if (role && token) {
    try {
      //Get the User Object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await role.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
