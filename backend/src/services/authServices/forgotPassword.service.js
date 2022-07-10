const User = require('models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
  InternalServerException,
  ResourceNotFoundException,
} = require('utilities/exceptions');
const { sendEmail } = require('utilities/sendEmail');
const {
  resetPasswordLinkTemplate,
} = require('templates/resetPasswordLinkTemplate');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const Logger = require('serverconfig/logger');

const forgotPassword = (data) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    Logger.info('Executing forgotPassword');
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        Logger.error(new Error(`User not found ${data.email}`));
        reject(new ResourceNotFoundException('User not found'));
        return;
      }
      const token = jwt.sign(
        // eslint-disable-next-line no-underscore-dangle
        { id: user._id },
        config.get('tokenSecretKey'),
      );
      sendEmail(user.email, resetPasswordLinkTemplate(user, token));
      Logger.info(
        `Reset password link send to email id ${data.email}`,
      );
      resolve(
        generateSuccessResponse(
          'Reset password link send to email id',
          '',
        ),
      );
    } catch (error) {
      Logger.error(new Error(`Database connection error ${error}`));
      reject(new InternalServerException('Internal Server Error'));
    }
  });

module.exports = forgotPassword;
