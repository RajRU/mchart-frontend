/* eslint-disable no-async-promise-executor */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const User = require('models/User');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const {
  InternalServerException,
  ResourceNotFoundException,
  //   ConflictException,
} = require('utilities/exceptions');
const Logger = require('serverconfig/logger');

const getProfile = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: mongoose.Types.ObjectId(id),
      }).lean();
      if (!user) {
        return resolve(
          new ResourceNotFoundException('User Not Found'),
        );
      }
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.isEmailVerified;
      delete user.isUserDeleted;
      delete user._id;
      return resolve(
        generateSuccessResponse('User Fatch successfully', user),
      );
    } catch (error) {
      Logger.error(new Error(error));
      return reject(
        new InternalServerException('Internal Server Error'),
      );
    }
  });

module.exports = getProfile;
