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
  ConflictException,
} = require('utilities/exceptions');
const Logger = require('serverconfig/logger');

const verifyEmail = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      if (data.id) {
        const user = await User.findOne({
          _id: mongoose.Types.ObjectId(data.id),
        });
        if (!user) {
          Logger.error(new Error(`User not found ${data.id}`));
          reject(new ResourceNotFoundException('User not found'));
          return;
        }
        // check user verified or not
        if (user && user.isEmailVerified) {
          Logger.error(
            new Error(`Email already verified${user._id}`),
          );
          reject(new ConflictException('Email already verified'));
          return;
        }
        await User.updateOne(
          { _id: mongoose.Types.ObjectId(user._id) },
          { isEmailVerified: true },
        );
        resolve(
          generateSuccessResponse('Email verified successfully'),
        );
      }
    } catch (error) {
      Logger.error(new Error(error));
      reject(new InternalServerException('Internal Server Error'));
    }
  });

module.exports = verifyEmail;
