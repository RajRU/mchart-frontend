/* eslint-disable no-underscore-dangle */
const { InternalServerException } = require('utilities/exceptions');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const ALT = require('models/ALT');

async function getScore() {
  try {
    const students = await ALT.find({});
    return Promise.resolve(
      generateSuccessResponse('Login successfully', students),
    );
  } catch (error) {
    if (error.statusCode) {
      return Promise.reject(error);
    }
    // console.log(error);
    return Promise.reject(
      new InternalServerException('Internal Server Error', error),
    );
  }
}

module.exports = getScore;
