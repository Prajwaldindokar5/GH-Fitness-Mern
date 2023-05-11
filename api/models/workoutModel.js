const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    slug: String,
    muscleName: {
      type: String,
      required: [true, 'A muscle must have a name'],
      unique: true,
    },
    muscleImg: String,
    exercises: {
      exercise_1: {
        id: Number,
        exerciseName: String,
        exerciseImg: String,
        exerciseRepRange: String,
      },
      exercise_2: {
        id: Number,
        exerciseName: String,
        exerciseImg: String,
        exerciseRepRange: String,
      },
      exercise_3: {
        id: Number,
        exerciseName: String,
        exerciseImg: String,
        exerciseRepRange: String,
      },
      exercise_4: {
        id: Number,
        exerciseName: String,
        exerciseImg: String,
        exerciseRepRange: String,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
