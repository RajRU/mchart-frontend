const authServices = require('services/authServices');
const Logger = require('serverconfig/logger');

const changePassword = (req, res, next) => {
  authServices
    .changePassword(req.id, req.body)
    .then((response) => {
      Logger.info('Exit log : Password changed successfully');
      res.status(200).json(response);
    })
    .catch((error) => {
      Logger.error(new Error(`Exit log : ${error}`));
      next(error);
    });
};

module.exports = changePassword;
