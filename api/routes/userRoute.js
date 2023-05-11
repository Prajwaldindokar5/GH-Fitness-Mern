const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const dietController = require('../controllers/dietController');

const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, userController.updateMe);

router.route('/').get(userController.getAllUsers);

// diet routes
router.post('/diet', authController.protect, dietController.createDietPlan);
router.patch('/updateDiet', authController.protect, dietController.updateDiet);

module.exports = router;
