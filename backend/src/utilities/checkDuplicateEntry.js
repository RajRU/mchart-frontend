/* eslint-disable consistent-return */
const { ConflictException } = require('utilities/exceptions');

const checkDuplicateEntry = (error, title) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    return new ConflictException(`${title} name already exist`);
  }
};
module.exports = checkDuplicateEntry;
