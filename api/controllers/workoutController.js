const Workout = require('../models/workoutModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllWorkouts = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find();
  res.status(200).json({
    status: 'success',
    results: workouts.length,

    workouts,
  });
});

exports.getWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findOne({ slug: req.params.slug });

    if (!workout) {
      return next(new AppError(`Unable to find workout with that id`, 400));
    }

    res.status(200).json({
      status: 'success',

      workout,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.updateWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!workout) {
      return next(new AppError(`Unable to find workout with that id`, 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        workout,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return next(new AppError(`Unable to find workout with that id`, 400));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};
