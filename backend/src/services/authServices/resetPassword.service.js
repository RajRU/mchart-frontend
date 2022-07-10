/* eslint-disable no-async-promise-executor */
const User = require('models/User');
const bcrypt = require('bcrypt');
const {
  InternalServerException,
  ResourceNotFoundException,
} = require('utilities/exceptions');
const mongoose = require('mongoose');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const Logger = require('serverconfig/logger');

const resetPassword = (data) => {
  Logger.info('Executing resetPassword');
  return new Promise(async (resolve, reject) => {
    const encryptedPassword = bcrypt.hashSync(data.password, 10);
    try {
      const user = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(data.id) },
        {
          $set: {
            password: encryptedPassword,
            isEmailVerified: true,
          },
        },
      );
      if (!user) {
        Logger.error(new Error(`User not found ${data.id}`));
        reject(new ResourceNotFoundException('User not found'));
        return;
      }
      Logger.info('Password reset successfully');
      resolve(generateSuccessResponse('Password reset successfully'));
    } catch (error) {
      Logger.error(new Error(`Database connection error ${error}`));
      reject(new InternalServerException('Internal Server Error'));
    }
  });
};

module.exports = resetPassword;
