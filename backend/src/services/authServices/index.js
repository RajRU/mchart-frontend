const registerUser = require('./registerUser.service');
const verifyEmail = require('./verifyEmail.service');
const loginUser = require('./loginUser.service');
const forgotPassword = require('./forgotPassword.service');
const resetPassword = require('./resetPassword.service');
const changePassword = require('./changePassword.service');
const getProfile = require('./getProfile.service');

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
};
