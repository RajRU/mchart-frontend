const authServices = require('services/authServices');
const Logger = require('serverconfig/logger');

const resetPassword = (req, res, next) => {
  authServices
    .resetPassword(req.body)
    .then((response) => {
      Logger.info('Exit log : Password reset successfully');
      res.status(200).json(response);
    })
    .catch((error) => {
      Logger.error(new Error(`Exit log : ${error}`));
      next(error);
    });
};

module.exports = resetPassword;
