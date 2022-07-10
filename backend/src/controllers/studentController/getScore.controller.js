const studentServices = require('services/studentServices');
const Logger = require('serverconfig/logger');

const getAllStudent = (req, res, next) => {
  studentServices
    .getScore(req.body)
    .then((response) => {
      Logger.info('Exit log : Collection added successfully');
      res.status(200).json(response);
    })
    .catch((error) => {
      Logger.error(new Error(`Exit log : ${error}`));
      next(error);
    });
};

module.exports = getAllStudent;
