const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createDietPlan = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const { weight } = req.body;
  const { height } = req.body;
  const { age } = req.body;
  const { gender } = req.body;
  const { activity } = req.body;

  if (!weight || !height || !age || !gender || !activity) {
    return next(new AppError('Please provide all information', 400));
  }
  user.createDiet(age, height, weight, gender, activity);

  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    user,
  });
});

exports.updateDiet = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const { weight, height, age, gender, activity } = req.body;

  if (!weight || !height || !age || !gender || !activity) {
    return next(new AppError('Please provide all information', 400));
  }
  user.createDiet(age, height, weight, gender, activity);

  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    user,
  });
});
