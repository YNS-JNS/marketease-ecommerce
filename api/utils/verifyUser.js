import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

/**
 * Middleware function to verify the JWT token in the request.
 * If the token is valid, it attaches the decoded user object to the request object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
*/
export const verifyToken = (req, res, next) => {

  // Extract the JWT token from the request
  const token = req.cookies.access_token;


  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    // If there is an error in verifying the token, return a 403 Forbidden error
    if (err) return next(errorHandler(403, 'Forbidden'));

    // Attach the decoded user object to the request
    req.user = user;

     // Call the next middleware function
    next();
  });
};
