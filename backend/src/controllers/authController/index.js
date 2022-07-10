const express = require('express');

const router = express.Router();
const { uploadImage } = require('utilities/uploadImage');
const registerUserSchema = require('schema/registerUser.schema');
const { verifyToken } = require('utilities/verifyJwtToken');
const loginSchema = require('schema/login.schema');
const forgotPasswordSchema = require('schema/forgotPassword.schema');
const resetPasswordSchema = require('schema/resetPassword.schema');
const { verifyUserToken } = require('utilities/verifyJwtToken');
const changePasswordSchema = require('schema/changePassword.schema');
const validateRequest = require('utilities/validateRequest');
const changePassword = require('./changePassword.controller');
const resetPassword = require('./resetPassword.controller');
const forgotPassword = require('./forgotPassword.controller');
const loginUser = require('./loginUser.controller');
const verifyEmail = require('./verifyEmail.controller');
const registerUser = require('./registerUser.controller');
const getProfile = require('./getProfile.controller');

router
  .route('/register')
  .post(
    uploadImage.fields([{ name: 'kycDoc', maxCount: 1 }]),
    validateRequest(registerUserSchema),
    registerUser,
  );
router.route('/verify-email').post(verifyToken, verifyEmail);
router.route('/login').post(validateRequest(loginSchema), loginUser);
router
  .route('/forgot-password')
  .post(validateRequest(forgotPasswordSchema), forgotPassword);
router
  .route('/reset-password')
  .put(
    verifyToken,
    validateRequest(resetPasswordSchema),
    resetPassword,
  );
router
  .route('/change-password')
  .put(
    verifyUserToken,
    validateRequest(changePasswordSchema),
    changePassword,
  );

router.route('/me').get(verifyUserToken, getProfile);

module.exports = router;
