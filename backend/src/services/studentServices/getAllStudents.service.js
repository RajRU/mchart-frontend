/* eslint-disable no-underscore-dangle */
const { InternalServerException } = require('utilities/exceptions');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const Student = require('models/Student');

async function getAllStudents() {
  try {
    const students = await Student.find({});
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

module.exports = getAllStudents;
