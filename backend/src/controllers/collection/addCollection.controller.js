const collectionServices = require('services/collection');
const Logger = require('serverconfig/logger');

const addCollection = (req, res, next) => {
  collectionServices
    .addCollection(req.body)
    .then((response) => {
      Logger.info('Exit log : Collection added successfully');
      res.status(200).json(response);
    })
    .catch((error) => {
      Logger.error(new Error(`Exit log : ${error}`));
      next(error);
    });
};

module.exports = addCollection;
