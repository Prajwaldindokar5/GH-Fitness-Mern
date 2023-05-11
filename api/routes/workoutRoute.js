const express = require('express');
const workoutController = require('../controllers/workoutController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(workoutController.getAllWorkouts);

router.route('/:slug').get(workoutController.getWorkout);

router
  .route('/:id')
  .patch(workoutController.updateWorkout)
  .delete(workoutController.deleteWorkout);

module.exports = router;
