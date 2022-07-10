/* eslint-disable no-unused-expressions */
const Logger = require('serverconfig/logger');
const createException = require('./createException');

class ForbiddenException extends Error {
  constructor(exception, data) {
    super();
    data
      ? Logger.error(`${exception} ${data}`)
      : Logger.error(exception);
    createException(exception, 'Forbidden', this, 403);
  }
}

module.exports = ForbiddenException;
