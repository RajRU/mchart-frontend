/* eslint-disable no-unused-expressions */
const Logger = require('serverconfig/logger');
const createException = require('./createException');

class UnauthorizedException extends Error {
  constructor(exception, data) {
    super();
    data
      ? Logger.error(`${exception} ${data}`)
      : Logger.error(exception);
    createException(exception, 'Unauthorized Request', this, 401);
  }
}

module.exports = UnauthorizedException;
