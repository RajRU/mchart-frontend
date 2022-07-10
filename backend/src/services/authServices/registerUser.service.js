/* eslint-disable no-underscore-dangle */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-param-reassign */
// const path = require('path');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('models/User');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const {
  InternalServerException,
  ConflictException,
  ResourceNotFoundException,
} = require('utilities/exceptions');
const { sendEmail } = require('utilities/sendEmail');
const Logger = require('serverconfig/logger');
const {
  welcomeEmailTemplate,
} = require('templates/welcomeEmailTemplate');
// const {
//   addImage,
//   deleteImageFromDisk,
// } = require('utilities/addImage');

const checkUserExistOrNot = async (email) => {
  const user = await User.findOne({ email }, { _id: 1 });
  if (user) {
    Logger.info(`User already exist${user._id}`);
    throw new ConflictException('User already exist');
  }
};

const checkIsReferralUserDeleted = async (referralId) => {
  const referralUser = await User.findOne({ _id: referralId });
  if (referralUser.isUserDeleted) {
    Logger.info(
      `User can not register using deleted referral user link${referralUser._id}`,
    );
    throw new ResourceNotFoundException(
      'User can not register using deleted referral user link',
    );
  }
};

const registerUser = (data, images) =>
  new Promise(async (resolve, reject) => {
    Logger.info('execute registerUser', images);
    const encryptedPassword = bcrypt.hashSync(data.password, 10);
    data.password = encryptedPassword;
    try {
      await checkUserExistOrNot(data.email);
      if (data.referralId) {
        await checkIsReferralUserDeleted(data.referralId);
      }
      // const createImageData = await addImage(images);
      const newUser = await User.create({
        ...data,
        // kycDoc: createImageData._id,
      });
      const tokeData = { id: newUser._id };
      const token = jwt.sign(tokeData, config.get('userLoginSecret'));
      if (config.get('sendEmailNotification')) {
        sendEmail(
          newUser.email,
          welcomeEmailTemplate(newUser, token),
        );
      }
      Logger.info('User registered successfully');
      // deleteImageFromDisk(path.join(images[0].path));
      resolve(
        generateSuccessResponse('User registered successfully'),
      );
    } catch (error) {
      // deleteImageFromDisk(path.join(images[0].path));
      console.log(error);
      if (error.statusCode) {
        reject(error);
        return;
      }
      Logger.error(new Error(`Database connection error ${error}`));
      reject(new InternalServerException('Internal Server Error'));
    }
  });

module.exports = registerUser;
