const Logger = require('serverconfig/logger');
const createException = require('./createException');

class NotAllowedException extends Error {
  constructor(exception) {
    super();
    Logger.error(exception);
    createException(exception, 'Not Allowed', this, 405);
  }
}

module.exports = NotAllowedException;
