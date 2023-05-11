const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'src/img');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image file', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadUserPhoto = upload.single('photo');

// exports.resizeUserPhoto = (req, res, next) => {
//   if (!req.file) return next();

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

//   sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`src/img/${req.file.filename}`);

//   next();
// };

// const filterObj = (obj, ...fields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (fields.includes(el)) newObj[el] = obj[el];
//   });

//   return newObj;
// };

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1 check  the user try to update password if send error
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('You cannot update your password here', 400));
  }

  // 2 getting user and updating data
  // const filteredBody = filterObj(req.body, 'name', 'email');
  // if (req.file) filteredBody.photo = req.file.filename;
  const { name, email, photo } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, photo },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'Sucess',
    user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);
  if (!user) {
    return next(new AppError('Something went wrong, Try again later.', 500));
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
