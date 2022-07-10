/* eslint-disable no-underscore-dangle */
const { InternalServerException } = require('utilities/exceptions');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');

async function addCollection(body) {
  try {
    return Promise.resolve(
      generateSuccessResponse('Login successfully', { body }),
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

module.exports = addCollection;
