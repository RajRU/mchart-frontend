/* eslint-disable no-async-promise-executor */
/* eslint-disable no-underscore-dangle */
const User = require('models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
  InternalServerException,
  ResourceNotFoundException,
  UnauthorizedException,
} = require('utilities/exceptions');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const handleAsync = require('utilities/handleAsync');
const Logger = require('serverconfig/logger');
const { COLLECTOR, ARTIST } = require('utilities/constants');

const loginUser = (data) =>
  new Promise(async (resolve, reject) => {
    const [user, findUserError] = await handleAsync(
      User.findOne({ email: data.email })
        .populate({
          path: 'packages',
          match: { isTokenTransfer: false },
        })
        .lean(),
    );
    if (findUserError) {
      Logger.error(new Error(findUserError));
      reject(new InternalServerException('Internal Server Error'));
    }
    if (!user) {
      Logger.error(new Error(`User not found ${data.email}`));
      reject(new ResourceNotFoundException('User not found'));
      return;
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      reject(new UnauthorizedException('Invalid password'));
      return;
    }
    if (user.isUserDeleted) {
      Logger.error(
        new Error(`User is deleted by admin ${data.email}`),
      );
      reject(
        new ResourceNotFoundException('User is deleted by admin'),
      );
      return;
    }
    // if (!user.isEmailVerified) {
    //   reject(
    //     new UnauthorizedException(
    //       'Please verify your email. You can login after verifying email only.',
    //     ),
    //   );
    //   return;
    // }
    const key =
      user.role === (COLLECTOR || ARTIST)
        ? config.get('userLoginSecret')
        : config.get('adminLoginSecret');
    const token = jwt.sign({ id: user._id }, key);
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.isEmailVerified;
    delete user.isUserDeleted;

    resolve(
      generateSuccessResponse('Login successfully', { user, token }),
    );
  });

module.exports = loginUser;
