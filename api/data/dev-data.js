const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Workout = require('../models/workoutModel');

const app = require('../app');
const User = require('../models/userModel');

mongoose.set('strictQuery', false);

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log(`Database Connection is Successfull`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});

const workout = JSON.parse(
  fs.readFileSync(`${__dirname}/workout.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Workout.create(workout);

    console.log(`Data Added Successfully`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Workout.deleteMany();

    console.log(`Data Deleted Successfully`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
