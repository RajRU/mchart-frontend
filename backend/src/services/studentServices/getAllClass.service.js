/* eslint-disable no-underscore-dangle */
const { InternalServerException } = require('utilities/exceptions');
const {
  generateSuccessResponse,
} = require('utilities/generateResponse');
const Student = require('models/Student');

async function getAllClass() {
  try {
    const students = await Student.find({}).lean();
    const allClasses = students.map((res) => res.classIDs);
    let classes = [];
    allClasses.forEach((element) => {
      classes.push(...element);
    });
    classes = [...new Set(classes)];
    return Promise.resolve(
      generateSuccessResponse('Login successfully', classes),
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

module.exports = getAllClass;
