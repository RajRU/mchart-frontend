/* eslint-disable no-async-promise-executor */
const User = require('models/User');
const mongoose = require('mongoose');
const {
  InternalServerException,
  ResourceNotFoundException,
  UnauthorizedException,
} = require('utilities/exceptions');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const bcrypt = require('bcrypt');
const Logger = require('serverconfig/logger');

const changePassword = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      Logger.info('Executing changePassword');
      const user = await User.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
      if (!user) {
        Logger.error(new Error(`User not found ${id}`));
        reject(new ResourceNotFoundException('User not found'));
        return;
      }
      if (!bcrypt.compareSync(data.oldPassword, user.password)) {
        Logger.error(
          new Error(`Current Password entered is incorrect ${id}`),
        );
        reject(
          new UnauthorizedException(
            'Current Password entered is incorrect',
          ),
        );
        return;
      }
      const encryptedPassword = bcrypt.hashSync(data.newPassword, 10);
      await User.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { password: encryptedPassword },
      );
      Logger.info('Password changed successfully');
      resolve(
        generateSuccessResponse('Password changed successfully'),
      );
    } catch (error) {
      Logger.error(new Error(`Database connection error ${error}`));
      reject(new InternalServerException('Internal Server Error'));
    }
  });

module.exports = changePassword;
