/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEMail = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const createSendToken = (user, status, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  user.password = undefined;

  res.cookie('jwt', token, cookieOptions).status(status).json({
    status: 'success',
    token,
    user: user,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const userFound = await User.findOne({ email: req.body.email });
  if (userFound) return next(new AppError('User already exists', 400));
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  // await sendEMail({
  //   email: newUser.email,
  //   subject: 'Welcome to GH Fitness',
  //   message: 'Welcome \n Thank you for joining us',
  // });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = await req.body;

  // 1 check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2 check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3 if every thing ok send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.clearCookie('jwt', {
    sameSite: 'none',
    secure: true,
  });
  res.status(200).json({
    status: 'success',
    message: 'Logout Successfull',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1 get token and check of if exist
  const token = req.cookies.jwt;

  if (!token) {
    return next(
      new AppError('You are not login! Please login to get access', 401)
    );
  }

  // 2 verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3 check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }

  // 4 check if user changed password after the token was recived
  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError('User recently change password. Please Login again!', 401)
    );
  }

  //grant access to the protected route
  req.user = currentUser;

  next();
});
exports.isLoggedin = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.passwordChangedAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1 get user based on given email adress
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError('Unable to find user with that email adress.', 404)
    );
  }

  // 2 generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3 Send it to user's email
  const resetUrl = `${req.protocol}://localhost:8800/resetPassword/${resetToken}`;

  const message = `Forgot your password, click this link --> ${resetUrl}.\n With password and confirm password.`;

  try {
    await sendEMail({
      email: user.email,
      subject: 'Your password reset token (valid for only 10mins)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Email Send successfully',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.resetTokenExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error while sending the email, Please try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1 get user based on the hash token

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    resetTokenExpiresAt: { $gt: Date.now() },
  });

  // 2 if token has not expired set the new password

  if (!user) {
    return next(new AppError('Token is invalid or expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.resetTokenExpiresAt = undefined;
  await user.save();

  // 3 update changedPasswordAt properrty for the user
  // 4 send jwt token to the client
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1 get user from collection
  const user = await User.findById(req.user.id).select('+password');
  console.log(user);

  //2 check if posted current password is correct
  console.log(req.body.currentpassword);
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError(`Password is incorrect, try again`, 401));
  }

  //3 if so update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4 log user in and send jwt
  createSendToken(user, 200, res);
});
