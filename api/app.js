/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookiePaeser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const workoutRouter = require('./routes/workoutRoute');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(cors({ origin: 'http://localhost:8800', credentials: true }));
app.use(bodyParser.json());

//global middleware
// set htttp security
app.use(helmet());

//
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requests from this IP, try again in an hour',
});

app.use('/api', limiter);

//body parser
app.use(express.json({ limit: '10kb' }));
app.use(cookiePaeser());

//sanitize against no sql attack
app.use(mongoSanitize());

//sanitize against xss data
app.use(xss());

//prevent parameter pollution
app.use(hpp());

//routes

app.use('/api/v1/workout', workoutRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
