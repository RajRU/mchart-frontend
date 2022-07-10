/* eslint-disable no-async-promise-executor */
const Image = require('models/Image');
const path = require('path');
const fs = require('fs');
const Logger = require('serverconfig/logger');

const deleteImageFromDisk = (paths, callback) => {
  fs.unlink(paths, (err) => {
    if (err) {
      callback(err);
    }
  });
};

const addImage = (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const imageData = await Image.create({
        mimetype: images[0].mimetype,
        image: {
          data: fs.readFileSync(path.join(images[0].path)),
          contentType: images[0].mimetype,
        },
      });
      return resolve(imageData);
    } catch (error) {
      Logger.error(new Error(`Database connection error : ${error}`));
      return reject(new Error('Internal Server Error'));
    }
  });

module.exports = { addImage, deleteImageFromDisk };
