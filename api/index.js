import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors'
dotenv.config();

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB! 🎉');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

// Middleware: _____________________________
app.use(express.json());

/**
 * Middleware that parses cookies from the request headers.
 * It adds the parsed cookies to the request object.
*/
app.use(cookieParser());

app.use(cors({
  credentials : true,
  origin : "*",
}))

app.listen(port, () => {
  console.log(`Server is running 🚀 on port localhost: ${port} ^_^`);
});

// Routes: _____________________________

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


/**
 * This line of code configures the Express app to serve static files 
 * from the '/client/dist' directory. This is typically used for serving
 * front-end build files in a production environment.
 * 
 * The `app.use()` method is used to add middleware to the Express app.
 * The `express.static()` function is a built-in middleware function in Express
 * that serves static files from a specified directory.
 * 
 * @param {string} path.join(__dirname, '/client/dist') - The path to the 
 * directory that contains the static files.
*/
app.use(express.static(path.join(__dirname, '/client/dist')));

/*
This code snippet defines a route that matches any path and sends 
the index.html file from the client/dist directory as the response.
*/

/**
 * Middleware that serves the index.html file from the client/dist directory
 * as the response for any request that doesn't match a specific route.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
*/
app.get('*', (req, res) => {
  // Specify the path to the index.html file
  // Send the index.html file as the response
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

/**
 * Middleware for handling errors.
 * It takes four parameters: the error, request, response and next function.
 * It sends a JSON response with the appropriate status code and error message.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
*/
app.use((err, req, res, next) => {
  // Extract the status code and message from the error object
  // If not provided, default to 500 and 'Internal Server Error' respectively
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send the JSON response with the appropriate status code and error message
  return res.status(statusCode).json({
    success: false, // Set success to false
    statusCode, // Send the status code
    message, // Send the error message
  });
});

// Note: that you have to export app
// export default app;
