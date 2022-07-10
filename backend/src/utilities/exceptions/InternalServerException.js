/* eslint-disable no-unused-expressions */
const Logger = require('serverconfig/logger');
const createException = require('./createException');

class InternalServerException extends Error {
  constructor(exception, data) {
    super();
    data
      ? Logger.error(`${exception} ${data}`)
      : Logger.error(exception);
    createException(exception, 'Internal Server Error', this, 500);
  }
}

module.exports = InternalServerException;
