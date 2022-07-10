/* eslint-disable no-async-promise-executor */
const { ResourceNotFoundException } = require('utilities/exceptions');

const checkResourceAvailability = (id, data, message) =>
  new Promise(async (resolve, reject) => {
    if (!data) {
      return reject(
        new ResourceNotFoundException(
          `${message} no longer exist ${id}`,
        ),
      );
    }
    return resolve();
  });

module.exports = { checkResourceAvailability };
