/* eslint-disable no-unused-expressions */
const Logger = require('serverconfig/logger');
const createException = require('./createException');

class ConflictException extends Error {
  constructor(exception, data) {
    super();
    data
      ? Logger.error(`${exception} ${data}`)
      : Logger.error(exception);
    createException(exception, 'Conflict', this, 409);
  }
}

module.exports = ConflictException;
