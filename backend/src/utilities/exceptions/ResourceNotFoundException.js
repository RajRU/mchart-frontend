/* eslint-disable no-unused-expressions */
const Logger = require('serverconfig/logger');
const createException = require('./createException');

class ResourceNotFoundException extends Error {
  constructor(exception, data) {
    super();
    data
      ? Logger.error(`${exception} ${data}`)
      : Logger.error(exception);
    createException(exception, 'Resource Not Found', this, 404);
  }
}

module.exports = ResourceNotFoundException;
