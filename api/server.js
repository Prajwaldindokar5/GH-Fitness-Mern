const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.name}, ${err.message}`);
  process.exit(1);
});

mongoose.set('strictQuery', false);

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`Database Connection is Successfull`);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.name}, ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
