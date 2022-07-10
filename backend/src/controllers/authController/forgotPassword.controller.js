const authServices = require('services/authServices');
const Logger = require('serverconfig/logger');

const forgotPassword = (req, res, next) => {
  authServices
    .forgotPassword(req.body)
    .then((response) => {
      Logger.info(
        `Exit log : Reset password link send to email id ${req.body.email}`,
      );
      res.status(200).json(response);
    })
    .catch((error) => {
      Logger.error(new Error(`Exit log : ${error}`));
      next(error);
    });
};

module.exports = forgotPassword;
