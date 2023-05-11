/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default:
      'https://res.cloudinary.com/dljzenvs4/image/upload/v1683693369/gh-fitness/i3memijbquqil4id48no.jpg',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  resetTokenExpiresAt: Date,
  calories: { type: Number, default: 0 },
  micros: {
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
  },
});

userSchema.pre('save', async function (next) {
  //if no modification
  if (!this.isModified('password')) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //deleting password confirm field

  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimeStamp;
  }
  //false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetTokenExpiresAt = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.createDiet = function (
  age,
  height,
  weight,
  gender,
  activity
) {
  const menBMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  const womenBMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

  const activityType = function () {
    let value;
    if (activity === 'noexercise') {
      value = 1.2;
    } else if (activity === 'littleexercise') {
      value = 1.375;
    } else if (activity === 'moderateexercise') {
      value = 1.55;
    } else if (activity === 'intenseexercise') {
      value = 1.725;
    } else if (activity === ' veryhardexercise') {
      value = 1.9;
    } else {
      value = 1.2;
    }

    return value;
  };

  const genderBMR = gender === 'male' ? menBMR : womenBMR;
  const maintainceCalories = Math.trunc(genderBMR * activityType());

  const protein = Math.trunc(weight * 2.2);
  const fat = Math.trunc((maintainceCalories * 0.25) / 9);
  const carbFormula = Math.trunc(maintainceCalories - (protein * 4 + fat * 9));
  const carbs = Math.trunc(carbFormula / 4);

  this.calories = maintainceCalories;
  this.micros.protein = protein;
  this.micros.fat = fat;
  this.micros.carbs = carbs;

  console.log(Math.trunc(70 * 2.2));
};
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
